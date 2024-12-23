/*import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => {
  const mockSignInWithEmailAndPassword = jest.fn();
  const mockGetAuth = jest.fn();
  const mockOnAuthStateChanged = jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  });

  return {
    getAuth: () => mockGetAuth,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    onAuthStateChanged: mockOnAuthStateChanged,
    __esModule: true,
    _getMockSignIn: () => mockSignInWithEmailAndPassword,
    _getMockAuth: () => mockGetAuth,
    _getMockAuthState: () => mockOnAuthStateChanged,
  };
});

describe('LoginScreen', () => {
  const mockSignIn = jest.requireMock('firebase/auth')._getMockSignIn();
  const mockAuth = jest.requireMock('firebase/auth')._getMockAuth();
  const mockAuthState = jest.requireMock('firebase/auth')._getMockAuthState();
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup navigate mock before each test
    mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
  });

  test('should redirect to home-screen-plants after successful login', async () => {
    // Setup the mock implementation for sign in
    mockSignIn.mockResolvedValue({
      user: { email: 'user@example.com' }
    });

    // Setup auth state change to simulate successful login
    mockAuthState.mockImplementation((auth, callback) => {
      callback({ email: 'user@example.com' }); // Simulate logged in user
      return jest.fn();
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    // Interact with the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Sign In'));

    // Wait for navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home-screen-plants');
    });

    // Verify firebase auth was called correctly
    expect(mockSignIn).toHaveBeenCalledWith(
      mockAuth,
      'user@example.com',
      'password123'
    );

    // Verify onAuthStateChanged was called
    expect(mockAuthState).toHaveBeenCalledWith(
      mockAuth,
      expect.any(Function)
    );
  });
});*/

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => {
  const mockSignInWithEmailAndPassword = jest.fn();
  const mockCreateUserWithEmailAndPassword = jest.fn();
  const mockGetAuth = jest.fn();
  const mockOnAuthStateChanged = jest.fn((auth, callback) => {
    // Cette fonction sera assignée à unsubscribe dans le composant
    const unsubscribe = jest.fn();
    // Simuler le callback initial avec null (pas d'utilisateur)
    callback(null);
    return unsubscribe;
  });


  return {
    getAuth: () => mockGetAuth,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    onAuthStateChanged: mockOnAuthStateChanged,
    __esModule: true,
    _getMockSignIn: () => mockSignInWithEmailAndPassword,
    _getMockSignUp: () => mockCreateUserWithEmailAndPassword,
    _getMockAuth: () => mockGetAuth,
    _getMockAuthState: () => mockOnAuthStateChanged,
  };
});

describe('LoginScreen', () => {
  const mockSignIn = jest.requireMock('firebase/auth')._getMockSignIn();
  const mockSignUp = jest.requireMock('firebase/auth')._getMockSignUp();
  const mockAuth = jest.requireMock('firebase/auth')._getMockAuth();
  const mockAuthState = jest.requireMock('firebase/auth')._getMockAuthState();
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
  });

  test('should redirect to home-screen-plants after successful login', async () => {
    mockSignIn.mockResolvedValue({
      user: { email: 'user@example.com' }
    });

    mockAuthState.mockImplementation((auth, callback) => {
      callback({ email: 'user@example.com' });
      return () => {};
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home-screen-plants');
    });
  });

  test('should toggle between login and signup', () => {
    // Configurer le mock pour retourner une fonction unsubscribe valide
    mockAuthState.mockImplementation((auth, callback) => {
      const unsubscribe = jest.fn();
      callback(null);
      return unsubscribe;
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Need an account? Sign Up'));
    
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
  });
  test('should display error message on authentication failure', async () => {
    // Configurer le mock pour retourner une fonction unsubscribe valide
    mockAuthState.mockImplementation((auth, callback) => {
      const unsubscribe = jest.fn();
      callback(null);
      return unsubscribe;
    });

    const error = new Error('Incorrect password');
    error.message = 'Incorrect password';
    
    mockSignIn.mockRejectedValueOnce(error);
    
    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('Authentication error: Incorrect password')).toBeInTheDocument();
    });
  });
  test('should display success notification after successful signup', async () => {
    // Configurer le mock pour retourner une fonction unsubscribe valide
    mockAuthState.mockImplementation((auth, callback) => {
      const unsubscribe = jest.fn();
      callback(null);
      return unsubscribe;
    });

    mockSignUp.mockResolvedValueOnce({
      user: { email: 'newuser@example.com' }
    });

    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    // Switch to signup mode
    fireEvent.click(screen.getByText('Need an account? Sign Up'));

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'newuser@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('User created successfully!')).toBeInTheDocument();
    });

    expect(mockSignUp).toHaveBeenCalledWith(
      mockAuth,
      'newuser@example.com',
      'password123'
    );
  });
});
