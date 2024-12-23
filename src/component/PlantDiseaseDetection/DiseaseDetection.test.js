/*import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DiseaseDetection from './DiseaseDetection';

global.fetch = jest.fn();

describe('DiseaseDetection Component', () => {
  beforeEach(() => {
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


  /* error 
  test('handles API error gracefully', async () => {
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

  
//});

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

 import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiseaseDetection from './DiseaseDetection';

// Mock the child components
jest.mock('./Button', () => {
  return function MockButton({ onClick }) {
    return <button onClick={onClick}>Submit</button>;
  };
});

jest.mock('./Form', () => {
  return function MockForm({ handleImageChange }) {
    return (
      <input
        type="file"
        data-testid="file-input"
        onChange={handleImageChange}
      />
    );
  };
});

// Mock the fetch function
global.fetch = jest.fn();

describe('DiseaseDetection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders correctly with initial state', () => {
    render(<DiseaseDetection />);
    
    // Check if the title is rendered
    expect(screen.getByText('Check Your Plant Health')).toBeInTheDocument();
    
    // Check if form elements are present
    expect(screen.getByTestId('file-input')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    
    // Result should not be present initially
    expect(screen.queryByText(/disease detected/i)).not.toBeInTheDocument();
  });

  test('handles image upload', () => {
    render(<DiseaseDetection />);
    
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // The image should be stored in the component's state
    // (we can't directly test state, but we can test the effects)
  });

  test('shows alert when submitting without image', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<DiseaseDetection />);
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    expect(alertMock).toHaveBeenCalledWith('Please upload an image.');
    alertMock.mockRestore();
  });

  test('handles successful API call', async () => {
    const mockResponse = { result: 'Healthy plant detected' };
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<DiseaseDetection />);
    
    // Upload a file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    // Wait for the result to be displayed
    await waitFor(() => {
      expect(screen.getByText(mockResponse.result)).toBeInTheDocument();
    });
    
    // Verify API call
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/detect', {
      method: 'POST',
      body: expect.any(FormData),
    });
  });

  test('handles API error', async () => {
    // Mock console.error to prevent error output in test logs
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<DiseaseDetection />);
    
    // Upload a file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    // Wait for error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error uploading image:',
        expect.any(Error)
      );
    });
    
    consoleSpy.mockRestore();
  });

  test('matches snapshot', () => {
    const { container } = render(<DiseaseDetection />);
    expect(container).toMatchSnapshot();
  });
});