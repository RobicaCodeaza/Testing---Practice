import '@testing-library/jest-dom';

// vitest.setup.js
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Establishing API mocking before all tests
beforeAll(() => server.listen());

// Reset Handlers between tests, that we may add during the tests so they don't affect other tests
afterEach(() => server.resetHandlers());

// Cleanup after the tests are finished
afterAll(() => server.close());
