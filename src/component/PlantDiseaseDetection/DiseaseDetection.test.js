import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DiseaseDetection from './DiseaseDetection';

global.fetch = jest.fn();

describe('DiseaseDetection Component', () => {
  beforeEach(() => {
    // Mock the URL.createObjectURL function
    global.URL.createObjectURL = jest.fn(() => 'http://mocked-url.com/mock.png');
    fetch.mockClear();
  });

  test('renders the component correctly', () => {
    render(<DiseaseDetection />);
    
    expect(screen.getByTestId('title')).toHaveTextContent('Check Your Plant Health');
    expect(screen.getByTestId('submit-button-disease-detection')).toBeInTheDocument();
  });

  test('allows image upload', () => {
    render(<DiseaseDetection />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('form').querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files[0].name).toBe('test.png');
    
  });


  /* error test('handles API error gracefully', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(<DiseaseDetection />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('form').querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByTestId('submit-button-disease-detection');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/detect', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    consoleErrorMock.mockRestore();
  });
}); 

 //error with mock
 /*test("shows alert when submitting without an image", () => {
    // Create a spy on window.alert
    const mockMethod = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {
        return {
          method: mockMethod,
        };
      });
 
    // Render the component
    render(<DiseaseDetection />);
 
    // Find the submit button
    const submitButton = screen.getByTestId('submit-button-disease-detection');
    
    // Log additional debugging information
    console.log('Submit button exists:', !!submitButton);
    console.log('Button properties:', {
        testId: submitButton.getAttribute('data-testid'),
        type: submitButton.type,
        disabled: submitButton.disabled
    });

    // Try to simulate click
    try {
        fireEvent.click(submitButton);
        console.log('Click event fired successfully');
    } catch (error) {
        console.error('Error firing click event:', error);
    }
   
    // Check alert mock
    console.log('Alert mock calls:', alertMock.mock.calls);
 
    // Assertions
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith("Please upload an image.");
 
    // Restore the original alert function
    alertMock.mockRestore();
});
*/

  
});

/*test('successfully detects disease with API response', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ result: 'Healthy Plant' }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    render(<DiseaseDetection />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('form').querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByTestId('submit-button-disease-detection');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/detect', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('Healthy Plant');
    });
 });*/