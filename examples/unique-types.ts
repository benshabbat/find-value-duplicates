// Example file with unique type definitions (no duplicates)

// User related types - each with unique structure

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile extends User {
  bio: string;
  avatar: string;
  socialLinks: string[];
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

// Product related types - each serves different purpose

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductDetails extends Product {
  description: string;
  images: string[];
  category: string;
  tags: string[];
}

export interface ProductInventory {
  productId: string;
  quantity: number;
  warehouse: string;
  lastUpdated: Date;
}

// API related types - different response structures

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

export interface ErrorResponse {
  error: string;
  code: number;
  details?: Record<string, unknown>;
}

// Event related types - each for different event types

export interface ClickEvent {
  type: 'click';
  target: string;
  timestamp: Date;
  coordinates: { x: number; y: number };
}

export interface KeyboardEvent {
  type: 'keyboard';
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}

export interface FormSubmitEvent {
  type: 'form-submit';
  formId: string;
  values: Record<string, unknown>;
  isValid: boolean;
}

// Utility types - each with different purpose

export type Optional<T> = {
  [K in keyof T]?: T[K];
};

export type RequireOnly<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Enum types - each serves different classification

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest'
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTOCURRENCY = 'crypto'
}

// Complex nested types - each with unique structure

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  credentials: {
    username: string;
    password: string;
  };
  options: {
    ssl: boolean;
    timeout: number;
    poolSize: number;
  };
}

export interface ServerConfig {
  port: number;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
  };
}

export interface CacheConfig {
  provider: 'redis' | 'memory' | 'file';
  ttl: number;
  maxSize: number;
  evictionPolicy: 'lru' | 'fifo' | 'random';
}

// Generic types with constraints

export interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface EventEmitter<T extends Record<string, unknown[]>> {
  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void;
  emit<K extends keyof T>(event: K, ...args: T[K]): void;
  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void;
}

export interface Validator<T> {
  validate(value: unknown): value is T;
  validateAsync(value: unknown): Promise<boolean>;
  getErrors(): string[];
}