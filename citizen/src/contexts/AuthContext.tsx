import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'citizen' | 'department_head' | 'municipal_officer';
  avatar?: string;
  isEmailVerified: boolean;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language: string;
    theme: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: data.user,
            token,
          },
        });
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        navigate('/');
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: data.message || 'Login failed',
        });
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: 'Network error. Please try again.',
      });
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, but user needs to verify email
        dispatch({ type: 'SET_LOADING', payload: false });
        // Don't automatically log in, show verification message
        return data;
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: data.message || 'Registration failed',
        });
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: 'Network error. Please try again.',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return;

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        // Refresh failed, logout user
        logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
