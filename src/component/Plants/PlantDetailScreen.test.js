import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {  MemoryRouter , Routes, BrowserRouter ,Route} from 'react-router-dom';
import PlantDetailScreen from './PlantDetailScreen';
import { getDatabase, ref as dbRef, remove, get } from 'firebase/database';
import * as firebaseDatabase from 'firebase/database';

// Mock pour useLocation et useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      plant: {
        id: '123',
        name: 'Rose',
        state: 'Healthy',
        scientificName: 'Fleure',
        family: 'Rose Family',
        genus: 'Rs',
        image: 'path/to/image.jpg',
      },
    },
  }),
}));



// Mock pour Firebase
/*jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  dbRef: jest.fn(),
  remove: jest.fn(),
  get: jest.fn(),
}));*/
// Mock pour Firebase
jest.mock('firebase/database', () => {
  const set = jest.fn();

  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});

test('displays plant details correctly', () => {
  render(
    <BrowserRouter>
      <PlantDetailScreen />
    </BrowserRouter>
  );

 

  // Vérification des détails de la plante
  expect(screen.getByText('Nom:')).toBeInTheDocument();
  expect(screen.getByText('Rose')).toBeInTheDocument();
  expect(screen.getByText('État:')).toBeInTheDocument();
  expect(screen.getByText('Healthy')).toBeInTheDocument();
  expect(screen.getByText('Nom scientifique:')).toBeInTheDocument();
  expect(screen.getByText('Fleure')).toBeInTheDocument();
  expect(screen.getByText('Famille:')).toBeInTheDocument();
  expect(screen.getByText('Rose Family')).toBeInTheDocument();
  expect(screen.getByText('Genre:')).toBeInTheDocument();
  expect(screen.getByText('Rs')).toBeInTheDocument();
});

test('enables editing and saves changes', () => {
  render(
    <BrowserRouter>
      <PlantDetailScreen />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByTestId('edit-button'));

  const nameInput = screen.getByTestId('input-name');
  fireEvent.change(nameInput, { target: { value: 'Tulip' } });

  fireEvent.click(screen.getByTestId('save-button'));

  expect(nameInput.value).toBe('Tulip');
});


  test('cancels editing when cancel button is clicked', () => {
    render(
      <BrowserRouter>
        <PlantDetailScreen />
      </BrowserRouter>
    );

    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);

    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    // Check if view mode is restored
    expect(screen.getByText('Rose')).toBeInTheDocument();
  });
