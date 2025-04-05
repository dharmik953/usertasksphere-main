
import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export const AuthService = {
  // Login a user
  login: async (credentials: LoginCredentials): Promise<UserData> => {
    try {
      const response = await api.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;  // Rethrow to propagate the error to the component
    }
  },

  // Register a new user
  register: async (userData: RegisterData): Promise<UserData> => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;  // Rethrow to propagate the error to the component
    }
  },

  // Get user profile
  getUserProfile: async (): Promise<Partial<UserData>> => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  }
};


// export const AuthService = {
//   // Login a user
//   login: async (credentials: LoginCredentials): Promise<UserData> => {
//     const response = await api.post('/users/login', credentials);
//     return response.data;
//   },

//   // Register a new user
//   register: async (userData: RegisterData): Promise<UserData> => {
//     const response = await api.post('/users', userData);
//     return response.data;
//   },

//   // Get user profile
//   getUserProfile: async (): Promise<Partial<UserData>> => {
//     const response = await api.get('/users/profile');
//     return response.data;
//   }
// };
