// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'jest-fetch-mock';
import 'jest-canvas-mock';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
global.ReadableStream = require('stream-browserify');
global.WritableStream = require('stream-browserify');

// Crée une instance de mock pour axios
const mock = new MockAdapter(axios);

// Mock toutes les requêtes GET avec une réponse vide
mock.onGet(/.*/).reply(200, { message: "GET mock response" });

// Mock toutes les requêtes POST avec une réponse vide
mock.onPost(/.*/).reply(200, { message: "POST mock response" });


fetchMock.enableMocks();

// Mock toutes les requêtes fetch
fetchMock.mockResponse(JSON.stringify({ message: 'Mock fetch response' }));

//fetchMock.mockResponse(JSON.stringify({ message: 'Mock fetch response' }));
//fetchMock.mockResponseOnce(JSON.stringify({ message: 'Mock fetch response' }));