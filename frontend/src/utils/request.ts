import { mockData } from './mockData';

// Base URL for API requests
// const BASE_URL = '/api';

// Request method type
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Request options interface
interface RequestOptions {
  method?: Method;
  data?: any;
}

// API endpoints
export const endpoints = {
  cases: '/cases',
  clients: '/clients',
  finance: '/finance',
  schedules: '/schedules'
};

// Mock API response delay in milliseconds
const MOCK_DELAY = 300;

/**
 * Mock API request function
 */
export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET' } = options;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Handle different endpoints with mock data
  if (url === endpoints.cases) {
    if (method === 'GET') {
      return mockData.cases as unknown as T;
    }
  } else if (url === endpoints.clients) {
    if (method === 'GET') {
      return mockData.clients as unknown as T;
    }
  } else if (url === endpoints.finance) {
    if (method === 'GET') {
      return mockData.financialRecords as unknown as T;
    }
  } else if (url === endpoints.schedules) {
    if (method === 'GET') {
      return mockData.schedules as unknown as T;
    }
  }
  
  // If no mock data matches, return empty array
  return [] as unknown as T;
};

/**
 * Get all cases
 */
export const getCases = async () => {
  return request(endpoints.cases);
};

/**
 * Get all clients
 */
export const getClients = async () => {
  return request(endpoints.clients);
};

/**
 * Get all financial records
 */
export const getFinancialRecords = async () => {
  return request(endpoints.finance);
};

/**
 * Get all schedules
 */
export const getSchedules = async () => {
  return request(endpoints.schedules);
};