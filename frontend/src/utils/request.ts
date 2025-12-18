import { mockData } from './mockData';

// Request method type
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Request options interface
interface RequestOptions {
  method?: Method;
  data?: any;
}

// API endpoints
export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  cases: '/cases',
  clients: '/clients',
  finance: '/finance',
  schedules: '/schedules'
};

// Mock API response delay in milliseconds
const MOCK_DELAY = 300;

// Mock user data for login
const mockUsers = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    name: '管理员'
  },
  test: {
    id: '2',
    username: 'test',
    email: 'test@example.com',
    role: 'user',
    name: '测试用户'
  }
};

/**
 * API request function with auth support
 */
export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', data } = options;
  
  // Check if login request
  if (url === endpoints.login && method === 'POST') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Mock login response
    if ((data.username === 'admin' && data.password === 'admin123') || 
        (data.username === 'test' && data.password === 'test123')) {
      return {
        data: {
          user: mockUsers[data.username as 'admin' | 'test'],
          accessToken: 'mock-jwt-token-' + Date.now()
        }
      } as unknown as T;
    } else {
      throw new Error('Invalid credentials');
    }
  }
  
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
 * Login function
 */
export const login = async (credentials: { username: string; password: string }) => {
  return request(endpoints.login, {
    method: 'POST',
    data: credentials
  });
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