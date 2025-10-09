#!/usr/bin/env node

/**
 * ===============================================
 * TypeScript Value Duplicates Finder
 * ===============================================
 * Finds interfaces and types with identical content but different names
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class TypeDuplicateFinder {
  constructor(config = {}) {
    this.config = {
      scanPaths: ['./src', './lib', './types'],
      excludePaths: ['node_modules', '.next', 'dist', 'build', '.git'],
      fileExtensions: ['.ts', '.tsx'],
      excludeExtensions: ['.d.ts', '.test.ts', '.spec.ts'],
      minTypeLength: 5,
      outputFormat: 'console', // console, json, both
      outputFile: 'type-duplicates-report.json',
      ...config
    };
    
    this.typeDefinitions = new Map(); // Map of content -> array of locations
    this.duplicates = [];
    this.stats = {
      filesScanned: 0,
      typesFound: 0,
      duplicatesFound: 0,
      startTime: Date.now()
    };
  }

  /**
   * Main entry point - scans directories and finds duplicates
   */
  async run(customPaths = []) {
    console.log('🔍 Starting TypeScript value duplicates scan...\n');
    
    const scanPaths = customPaths.length > 0 ? customPaths : this.config.scanPaths;
    
    // Find existing paths
    const existingPaths = scanPaths.filter(p => {
      const fullPath = path.resolve(p);
      return fs.existsSync(fullPath);
    });
    
    if (existingPaths.length === 0) {
      console.log('❌ No valid scan paths found. Scanning current directory...');
      existingPaths.push('./');
    }
    
    console.log(`📁 Scanning paths: ${existingPaths.join(', ')}\n`);
    
    // Scan all paths
    for (const scanPath of existingPaths) {
      await this.scanDirectory(scanPath);
    }
    
    // Find duplicates
    this.findDuplicates();
    
    // Generate report
    this.generateReport();
    
    return {
      stats: this.stats,
      duplicates: this.duplicates
    };
  }

  /**
   * Scans directory recursively for TypeScript files
   */
  async scanDirectory(dirPath) {
    const files = this.getAllTypeScriptFiles(dirPath);
    
    for (const file of files) {
      try {
        await this.scanFile(file);
        this.stats.filesScanned++;
      } catch (error) {
        console.warn(`⚠️  Error scanning file ${file}: ${error.message}`);
      }
    }
  }

  /**
   * Recursively finds all TypeScript files
   */
  getAllTypeScriptFiles(dirPath) {
    const files = [];
    
    const scanDir = (currentPath) => {
      try {
        const items = fs.readdirSync(currentPath);
        
        for (const item of items) {
          // Skip excluded paths
          if (this.config.excludePaths.some(exclude => item.includes(exclude))) {
            continue;
          }
          
          const fullPath = path.join(currentPath, item);
          
          try {
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              scanDir(fullPath);
            } else if (this.isValidTypeScriptFile(item)) {
              files.push(fullPath);
            }
          } catch (error) {
            // Skip files we can't read
            continue;
          }
        }
      } catch (error) {
        console.warn(`⚠️  Cannot read directory ${currentPath}: ${error.message}`);
      }
    };
    
    scanDir(path.resolve(dirPath));
    return files;
  }

  /**
   * Checks if file is a valid TypeScript file to scan
   */
  isValidTypeScriptFile(fileName) {
    // Must have valid extension
    const hasValidExtension = this.config.fileExtensions.some(ext => fileName.endsWith(ext));
    if (!hasValidExtension) return false;
    
    // Must not have excluded extension
    const hasExcludedExtension = this.config.excludeExtensions.some(ext => fileName.endsWith(ext));
    if (hasExcludedExtension) return false;
    
    return true;
  }

  /**
   * Scans individual file for type definitions
   */
  async scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Find interfaces with various patterns
    this.findInterfaces(content, relativePath);
    
    // Find type aliases
    this.findTypeAliases(content, relativePath);
    
    // Find enums
    this.findEnums(content, relativePath);
  }

  /**
   * Finds interface definitions
   */
  findInterfaces(content, filePath) {
    // Enhanced interface regex to handle extends, generics, etc.
    const patterns = [
      // Basic interface: export interface Name { ... }
      /export\s+interface\s+(\w+)(?:<[^>]*>)?(?:\s+extends\s+[^{]+)?\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g,
      // Interface without export
      /(?:^|\n)\s*interface\s+(\w+)(?:<[^>]*>)?(?:\s+extends\s+[^{]+)?\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        this.processTypeDefinition('interface', match[1], match[2], filePath, match.index);
      }
    });
  }

  /**
   * Finds type alias definitions
   */
  findTypeAliases(content, filePath) {
    const patterns = [
      // Object type: export type Name = { ... }
      /export\s+type\s+(\w+)(?:<[^>]*>)?\s*=\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g,
      // Primitive type: export type Name = string | number
      /export\s+type\s+(\w+)(?:<[^>]*>)?\s*=\s*([^;\n{][^;\n]*)/g,
      // Type without export
      /(?:^|\n)\s*type\s+(\w+)(?:<[^>]*>)?\s*=\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g
    ];
    
    patterns.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        // Skip object types for primitive pattern
        if (index === 1 && match[2].includes('{')) continue;
        
        this.processTypeDefinition('type', match[1], match[2], filePath, match.index);
      }
    });
  }

  /**
   * Finds enum definitions
   */
  findEnums(content, filePath) {
    const patterns = [
      /export\s+enum\s+(\w+)\s*\{([^}]+)\}/g,
      /(?:^|\n)\s*enum\s+(\w+)\s*\{([^}]+)\}/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        this.processTypeDefinition('enum', match[1], match[2], filePath, match.index);
      }
    });
  }

  /**
   * Processes a single type definition
   */
  processTypeDefinition(kind, name, body, filePath, position) {
    const normalizedBody = this.normalizeTypeBody(body);
    const signature = this.createSignature(normalizedBody);
    
    // Skip if too short
    if (normalizedBody.length < this.config.minTypeLength) {
      return;
    }
    
    if (!this.typeDefinitions.has(signature)) {
      this.typeDefinitions.set(signature, []);
    }
    
    this.typeDefinitions.get(signature).push({
      kind,
      name,
      normalizedBody,
      filePath,
      position,
      originalBody: body.trim(),
      lineNumber: this.getLineNumber(position, filePath)
    });
    
    this.stats.typesFound++;
  }

  /**
   * Gets line number for position in file
   */
  getLineNumber(position, filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const beforePosition = content.substring(0, position);
      return beforePosition.split('\n').length;
    } catch {
      return 1;
    }
  }

  /**
   * Normalizes type body for comparison
   */
  normalizeTypeBody(body) {
    return body
      .trim()
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/;\s*/g, ';')
      .replace(/,\s*/g, ',')
      .replace(/\?\s*:/g, '?:')
      .replace(/:\s*/g, ':')
      .replace(/\|\s*/g, '|')
      .replace(/&\s*/g, '&')
      .replace(/readonly\s+/g, 'readonly ')
      // Handle object/array types
      .replace(/\{\s*/g, '{')
      .replace(/\s*\}/g, '}')
      .replace(/\[\s*/g, '[')
      .replace(/\s*\]/g, ']')
      // Split and sort fields for objects
      .split(/[;,]/)
      .filter(field => field.trim())
      .map(field => field.trim())
      .sort()
      .join(';');
  }

  /**
   * Creates unique signature for type content
   */
  createSignature(normalizedBody) {
    return crypto.createHash('md5').update(normalizedBody).digest('hex');
  }

  /**
   * Finds all duplicates
   */
  findDuplicates() {
    for (const [signature, definitions] of this.typeDefinitions) {
      if (definitions.length > 1) {
        const firstDef = definitions[0];
        if (firstDef.normalizedBody && firstDef.normalizedBody.length >= this.config.minTypeLength) {
          this.duplicates.push({
            signature,
            normalizedContent: firstDef.normalizedBody,
            occurrences: definitions,
            severity: this.calculateSeverity(definitions)
          });
          this.stats.duplicatesFound++;
        }
      }
    }
    
    // Sort by severity
    this.duplicates.sort((a, b) => b.severity - a.severity);
  }

  /**
   * Calculates duplicate severity score
   */
  calculateSeverity(definitions) {
    const numOccurrences = definitions.length;
    const contentLength = definitions[0].normalizedBody.length;
    const fileSpread = new Set(definitions.map(d => d.filePath)).size;
    
    return numOccurrences * contentLength * fileSpread;
  }

  /**
   * Generates and displays report
   */
  generateReport() {
    const duration = (Date.now() - this.stats.startTime) / 1000;
    
    if (this.config.outputFormat === 'console' || this.config.outputFormat === 'both') {
      this.printConsoleReport(duration);
    }
    
    if (this.config.outputFormat === 'json' || this.config.outputFormat === 'both') {
      this.saveJsonReport(duration);
    }
  }

  /**
   * Prints detailed console report
   */
  printConsoleReport(duration) {
    console.log('\n🔍 TypeScript Value Duplicates Report');
    console.log('='.repeat(60));
    
    // Statistics
    console.log(`📊 Statistics:`);
    console.log(`   Files scanned: ${this.stats.filesScanned}`);
    console.log(`   Types found: ${this.stats.typesFound}`);
    console.log(`   Duplicate groups: ${this.stats.duplicatesFound}`);
    console.log(`   Scan duration: ${duration.toFixed(2)}s`);
    
    if (this.duplicates.length === 0) {
      console.log('\n✅ No value duplicates found!');
      return;
    }
    
    console.log(`\n🚨 Found ${this.duplicates.length} duplicate groups:\n`);
    
    this.duplicates.forEach((duplicate, index) => {
      this.printDuplicateGroup(duplicate, index + 1);
    });
    
    this.printRecommendations();
  }

  /**
   * Prints individual duplicate group
   */
  printDuplicateGroup(duplicate, index) {
    console.log(`📋 Duplicate #${index} (severity: ${duplicate.severity}):`);
    console.log('   Shared content:');
    console.log(`   ${this.formatTypeContent(duplicate.normalizedContent)}`);
    console.log('\n   Found in:');
    
    duplicate.occurrences.forEach((occurrence, idx) => {
      console.log(`   ${idx + 1}. ${occurrence.kind} ${occurrence.name}`);
      console.log(`      📁 ${occurrence.filePath}:${occurrence.lineNumber}`);
      console.log(`      📝 ${occurrence.originalBody.substring(0, 100)}${occurrence.originalBody.length > 100 ? '...' : ''}`);
    });
    
    console.log('\n   💡 Suggested fix:');
    console.log(`   Create base interface and extend:`);
    const baseName = this.suggestBaseName(duplicate.occurrences);
    console.log(`   export interface ${baseName} {`);
    console.log(`     ${this.formatTypeContent(duplicate.normalizedContent, '     ')}`);
    console.log(`   }`);
    
    duplicate.occurrences.forEach(occ => {
      console.log(`   export interface ${occ.name} extends ${baseName} {}`);
    });
    
    console.log('\n' + '-'.repeat(50) + '\n');
  }

  /**
   * Suggests base name for interface
   */
  suggestBaseName(occurrences) {
    const names = occurrences.map(o => o.name);
    
    // Find common words
    const commonWords = this.findCommonWords(names);
    if (commonWords.length > 0) {
      return `Base${commonWords[0]}`;
    }
    
    // Use first name if no common words
    const cleanName = names[0].replace(/Props$|Type$|Interface$/, '');
    return `Base${cleanName}`;
  }

  /**
   * Finds common words in names
   */
  findCommonWords(names) {
    const words = names.map(name => name.match(/[A-Z][a-z]*/g) || []);
    const wordCounts = {};
    
    for (const wordList of words) {
      for (const word of wordList) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }
    
    return Object.entries(wordCounts)
      .filter(([word, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);
  }

  /**
   * Formats type content for display
   */
  formatTypeContent(content, indent = '   ') {
    return content
      .split(';')
      .filter(field => field.trim())
      .map(field => `${indent}${field.trim()};`)
      .join('\n');
  }

  /**
   * Prints recommendations
   */
  printRecommendations() {
    console.log('💡 Recommendations:');
    console.log('==========================================');
    console.log('1. Create base interfaces for shared properties');
    console.log('2. Use composition (extends) instead of duplication');
    console.log('3. Split large interfaces by Single Responsibility Principle');
    console.log('4. Use utility types like Pick, Omit, Partial when appropriate');
    console.log('5. Consider generic types for repeating patterns');
  }

  /**
   * Saves JSON report to file
   */
  saveJsonReport(duration) {
    const report = {
      timestamp: new Date().toISOString(),
      stats: {
        ...this.stats,
        duration: duration
      },
      config: this.config,
      duplicates: this.duplicates.map(dup => ({
        ...dup,
        recommendations: {
          baseName: this.suggestBaseName(dup.occurrences),
          baseInterface: this.formatTypeContent(dup.normalizedContent)
        }
      }))
    };
    
    const outputPath = this.config.outputFile;
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Report saved to: ${outputPath}`);
  }
}

module.exports = TypeDuplicateFinder;

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const configPath = args.find(arg => arg.startsWith('--config='))?.split('=')[1];
  const outputFormat = args.find(arg => arg.startsWith('--output='))?.split('=')[1];
  const help = args.includes('--help') || args.includes('-h');
  
  if (help) {
    console.log(`
TypeScript Value Duplicates Finder
==================================

Usage: node index.js [options] [paths...]

Options:
  --config=path     Path to config file (default: ./config.json if exists)
  --output=format   Output format: console, json, both (default: console)
  --help, -h        Show this help message

Examples:
  node index.js                    # Scan default paths
  node index.js ./src ./lib        # Scan specific paths
  node index.js --output=json      # Output to JSON file
  node index.js --config=my.json   # Use custom config
    `);
    process.exit(0);
  }
  
  // Load config
  let config = {};
  const defaultConfigPath = './config.json';
  const finalConfigPath = configPath || (fs.existsSync(defaultConfigPath) ? defaultConfigPath : null);
  
  if (finalConfigPath && fs.existsSync(finalConfigPath)) {
    try {
      config = JSON.parse(fs.readFileSync(finalConfigPath, 'utf8'));
      console.log(`📄 Using config from: ${finalConfigPath}`);
    } catch (error) {
      console.warn(`⚠️  Invalid config file: ${error.message}`);
    }
  }
  
  if (outputFormat) {
    config.outputFormat = outputFormat;
  }
  
  // Extract scan paths from arguments
  const scanPaths = args.filter(arg => !arg.startsWith('--'));
  
  // Run the tool
  const finder = new TypeDuplicateFinder(config);
  finder.run(scanPaths).catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}