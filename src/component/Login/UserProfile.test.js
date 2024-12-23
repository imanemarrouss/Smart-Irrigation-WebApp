import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';
import { getAuth, signOut, updatePassword } from '@firebase/auth';

// Mock Firebase Auth
jest.mock('@firebase/auth', () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
  updatePassword: jest.fn()
}));

// Setup window.alert mock
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('UserProfile Component', () => {
  const mockSetShowProfile = jest.fn();
  const mockUser = {
    email: 'test@example.com',
    displayName: 'Test User',
    currentUser: {
      email: 'test@example.com',
      displayName: 'Test User'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({
      currentUser: mockUser
    });
    mockAlert.mockClear();
  });

  test('renders login message when user is not authenticated', () => {
    getAuth.mockReturnValue({ currentUser: null });
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    expect(screen.getByText('Veuillez vous connecter pour accéder à votre profil.')).toBeInTheDocument();
  });

  test('renders user profile when authenticated', () => {
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    expect(screen.getByText('Bienvenue, Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('handles password change successfully', async () => {
    updatePassword.mockResolvedValueOnce();
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    fireEvent.click(screen.getByText(/Changer le mot de passe/i));
    
    const passwordInput = screen.getByPlaceholderText('Nouveau mot de passe');
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
    
    fireEvent.click(screen.getByText('Enregistrer'));
    
    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith(mockUser, 'newPassword123');
      expect(mockAlert).toHaveBeenCalledWith('Mot de passe modifié avec succès !');
    });
  });

  test('shows error for short password', async () => {
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    fireEvent.click(screen.getByText(/Changer le mot de passe/i));
    
    const passwordInput = screen.getByPlaceholderText('Nouveau mot de passe');
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    
    fireEvent.click(screen.getByText('Enregistrer'));
    
    expect(mockAlert).toHaveBeenCalledWith('Le mot de passe doit contenir au moins 6 caractères.');
  });

  test('handles sign out successfully', async () => {
    signOut.mockResolvedValueOnce();
    
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    fireEvent.click(screen.getByText(/Se déconnecter/i));
    
    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockSetShowProfile).toHaveBeenCalledWith(false);
      expect(mockAlert).toHaveBeenCalledWith('Déconnecté avec succès.');
    });
  });

  test('toggles dark theme', () => {
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    const themeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(themeButton);
    
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    
    fireEvent.click(themeButton);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  test('handles password update error', async () => {
    const error = new Error('Update failed');
    updatePassword.mockRejectedValueOnce(error);
    
    render(<UserProfile setShowProfile={mockSetShowProfile} />);
    
    fireEvent.click(screen.getByText(/Changer le mot de passe/i));
    
    const passwordInput = screen.getByPlaceholderText('Nouveau mot de passe');
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
    
    fireEvent.click(screen.getByText('Enregistrer'));
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Erreur lors de la modification du mot de passe: Update failed');
    });
  });
});