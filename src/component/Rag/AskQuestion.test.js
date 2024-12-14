import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AskQuestion from './AskQuestion';

// Mock fetch to control API responses
global.fetch = jest.fn();

describe('AskQuestion Component', () => {
  // Reset fetch mock before each test
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the component correctly', () => {
    render(<AskQuestion />);
    
    // Check for key elements
    expect(screen.getByText('Ask a Question about Agriculture')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your question here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ask' })).toBeInTheDocument();
  });

  test('allows entering a question', () => {
    render(<AskQuestion />);
    
    const input = screen.getByPlaceholderText('Type your question here...');
    fireEvent.change(input, { target: { value: 'What is crop rotation?' } });
    
    expect(input.value).toBe('What is crop rotation?');
  });

  test('disables submit button and shows loading state during submission', async () => {
    // Mock a slow response
    fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve, 1000)));

    render(<AskQuestion />);
    
    const input = screen.getByPlaceholderText('Type your question here...');
    const button = screen.getByRole('button', { name: 'Ask' });

    // Enter a question and submit
    fireEvent.change(input, { target: { value: 'What is crop rotation?' } });
    fireEvent.click(button);

    // Check button is disabled and shows loading
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  test('displays successful response', async () => {
    // Mock successful API response
    const mockResponse = { response: 'Crop rotation is an agricultural practice...' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    render(<AskQuestion />);
    
    const input = screen.getByPlaceholderText('Type your question here...');
    const button = screen.getByRole('button', { name: 'Ask' });

    // Enter a question and submit
    fireEvent.change(input, { target: { value: 'What is crop rotation?' } });
    fireEvent.click(button);

    // Wait for and check the response
    await waitFor(() => {
      expect(screen.getByText('Response:')).toBeInTheDocument();
      expect(screen.getByText('Crop rotation is an agricultural practice...')).toBeInTheDocument();
    });
  });

  test('handles API error', async () => {
    // Mock error response
    const mockErrorResponse = { error: 'Something went wrong' };
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(mockErrorResponse)
    });

    render(<AskQuestion />);
    
    const input = screen.getByPlaceholderText('Type your question here...');
    const button = screen.getByRole('button', { name: 'Ask' });

    // Enter a question and submit
    fireEvent.change(input, { target: { value: 'What is crop rotation?' } });
    fireEvent.click(button);

    // Wait for and check the error message
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  test('handles network error', async () => {
    // Mock network error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<AskQuestion />);
    
    const input = screen.getByPlaceholderText('Type your question here...');
    const button = screen.getByRole('button', { name: 'Ask' });

    // Enter a question and submit
    fireEvent.change(input, { target: { value: 'What is crop rotation?' } });
    fireEvent.click(button);

    // Wait for and check the network error message
    await waitFor(() => {
      expect(screen.getByText('Unable to connect to the backend')).toBeInTheDocument();
    });
  });
});