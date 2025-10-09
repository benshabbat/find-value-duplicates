// Example file with duplicate type definitions

// First duplicate group - User related types

export interface UserProps {
  id: string;
  name: string;
  email: string;
  age: number;
}

export type UserData = {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Second duplicate group - Product related types

export interface ProductProps {
  title: string;
  price: number;
  description: string;
  inStock: boolean;
}

export type ProductData = {
  title: string;
  price: number;
  description: string;
  inStock: boolean;
}

export interface ProductInfo {
  title: string;
  price: number;
  description: string;
  inStock: boolean;
}

// Third duplicate group - Simple status enum

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

// Fourth duplicate group - API Response structure

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export type ResponseData<T> = {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export interface ServerResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// Fifth duplicate group - Configuration objects

export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

export type ConfigOptions = {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

export interface Settings {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

// Sixth duplicate group - Date range objects

export interface DateRange {
  startDate: Date;
  endDate: Date;
  timezone?: string;
}

export type TimeRange = {
  startDate: Date;
  endDate: Date;
  timezone?: string;
}

export interface Period {
  startDate: Date;
  endDate: Date;
  timezone?: string;
}

// Complex nested duplicate

export interface ComplexUserProfile {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };
}

export type UserProfileData = {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };
}