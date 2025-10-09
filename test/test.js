const TypeDuplicateFinder = require('../index.js');
const fs = require('fs');
const path = require('path');

/**
 * Simple test runner for TypeDuplicateFinder
 */

async function runTests() {
  console.log('🧪 Running TypeDuplicateFinder Tests...\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Basic functionality with example files
  console.log('Test 1: Basic duplicate detection');
  try {
    const finder = new TypeDuplicateFinder({
      scanPaths: ['./examples'],
      outputFormat: 'json',
      outputFile: 'test-report.json'
    });
    
    const result = await finder.run();
    
    if (result.duplicates.length > 0) {
      console.log('✅ PASS: Found duplicates in example files');
      console.log(`✅ Success: Found ${result.duplicates.length} duplicate groups`);
      passed++;
    } else {
      console.log('❌ FAIL: No duplicates found in example files');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: Test failed with error: ${error.message}`);
    failed++;
  }

  // Test 2: Configuration loading
  console.log('\nTest 2: Configuration loading');
  try {
    const customConfig = {
      scanPaths: ['./examples'],
      minTypeLength: 10,
      outputFormat: 'console'
    };
    
    const finder = new TypeDuplicateFinder(customConfig);
    
    if (finder.config.minTypeLength === 10 && finder.config.outputFormat === 'console') {
      console.log('✅ PASS: Configuration loaded correctly');
      passed++;
    } else {
      console.log('❌ FAIL: Configuration not loaded correctly');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: Configuration test failed: ${error.message}`);
    failed++;
  }

  // Test 3: File extension filtering
  console.log('\nTest 3: File extension filtering');
  try {
    const finder = new TypeDuplicateFinder();
    
    const isValidTs = finder.isValidTypeScriptFile('component.ts');
    const isValidTsx = finder.isValidTypeScriptFile('component.tsx');
    const isInvalidDts = finder.isValidTypeScriptFile('types.d.ts');
    const isInvalidTest = finder.isValidTypeScriptFile('component.test.ts');
    
    if (isValidTs && isValidTsx && !isInvalidDts && !isInvalidTest) {
      console.log('✅ PASS: File filtering works correctly');
      passed++;
    } else {
      console.log('❌ FAIL: File filtering not working correctly');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: File filtering test failed: ${error.message}`);
    failed++;
  }

  // Test 4: Type normalization
  console.log('\nTest 4: Type normalization');
  try {
    const finder = new TypeDuplicateFinder();
    
    const type1 = '  id: string;  name: string;  ';
    const type2 = 'name:string;id:string;';
    const type3 = 'id:   string;\nname:    string;';
    
    const normalized1 = finder.normalizeTypeBody(type1);
    const normalized2 = finder.normalizeTypeBody(type2);
    const normalized3 = finder.normalizeTypeBody(type3);
    
    if (normalized1 === normalized2 && normalized2 === normalized3) {
      console.log('✅ PASS: Type normalization works correctly');
      passed++;
    } else {
      console.log('❌ FAIL: Type normalization not working correctly');
      console.log(`  normalized1: "${normalized1}"`);
      console.log(`  normalized2: "${normalized2}"`);
      console.log(`  normalized3: "${normalized3}"`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: Type normalization test failed: ${error.message}`);
    failed++;
  }

  // Test 5: Severity calculation
  console.log('\nTest 5: Severity calculation');
  try {
    const finder = new TypeDuplicateFinder();
    
    const definitions1 = [
      { normalizedBody: 'short', filePath: 'file1.ts' },
      { normalizedBody: 'short', filePath: 'file2.ts' }
    ];
    
    const definitions2 = [
      { normalizedBody: 'much longer type definition', filePath: 'file1.ts' },
      { normalizedBody: 'much longer type definition', filePath: 'file2.ts' },
      { normalizedBody: 'much longer type definition', filePath: 'file3.ts' }
    ];
    
    const severity1 = finder.calculateSeverity(definitions1);
    const severity2 = finder.calculateSeverity(definitions2);
    
    if (severity2 > severity1) {
      console.log('✅ PASS: Severity calculation works correctly');
      passed++;
    } else {
      console.log(`❌ FAIL: Severity calculation not working correctly (${severity1} vs ${severity2})`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: Severity calculation test failed: ${error.message}`);
    failed++;
  }

  // Test 6: Base name suggestion
  console.log('\nTest 6: Base name suggestion');
  try {
    const finder = new TypeDuplicateFinder();
    
    const occurrences = [
      { name: 'UserProps' },
      { name: 'UserData' },
      { name: 'UserInfo' }
    ];
    
    const baseName = finder.suggestBaseName(occurrences);
    
    if (baseName.includes('User') || baseName.includes('Base')) {
      console.log(`✅ PASS: Base name suggestion works (suggested: ${baseName})`);
      passed++;
    } else {
      console.log(`❌ FAIL: Base name suggestion not working (suggested: ${baseName})`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAIL: Base name suggestion test failed: ${error.message}`);
    failed++;
  }

  // Cleanup test files
  try {
    if (fs.existsSync('test-report.json')) {
      fs.unlinkSync('test-report.json');
    }
  } catch (error) {
    console.warn('Warning: Could not clean up test files');
  }

  // Test summary
  console.log('\n' + '='.repeat(50));
  console.log('🧪 Test Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('💥 Some tests failed!');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('❌ Test runner error:', error.message);
    process.exit(1);
  });
}

module.exports = { runTests };