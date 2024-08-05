import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
// import { logRoles } from '@testing-library/react';
import { kebabCaseToTitleCase } from './helpers/helpers';

test('Button Click Flow', () => {
  //render App

  render(<App></App>);

  //find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i });

  //Check initial color
  expect(buttonElement).toHaveClass('medium-violet-red');

  //click the butto
  fireEvent.click(buttonElement);

  //check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  //check button color
  expect(buttonElement).toHaveClass('midnight-blue');
  // expect(buttonElement).toHaveStyle({ 'background-color': 'blue' });
});

test('Checkbox Flow', () => {
  render(<App></App>);
  //find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  });

  //check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  //click the checkbox to activate
  fireEvent.click(checkboxElement);

  //check after click status
  expect(buttonElement).toHaveClass('gray');
  expect(buttonElement).not.toBeEnabled();
  expect(checkboxElement).toBeChecked();

  //click the checkbox again to deactivate
  fireEvent.click(checkboxElement);

  //check after click status
  expect(buttonElement).not.toHaveClass('gray');
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox Flow before button click', () => {
  render(<App></App>);
  //find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  });

  //check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  //click the checkbox to activate
  fireEvent.click(checkboxElement);

  //check after click status
  expect(buttonElement).toHaveClass('gray');
  expect(buttonElement).not.toBeEnabled();
  expect(checkboxElement).toBeChecked();

  //click the checkbox again to deactivate
  fireEvent.click(checkboxElement);

  //check after click status
  expect(buttonElement).toHaveClass('medium-violet-red');
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox Flow after button click', () => {
  render(<App></App>);
  //find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  });

  //click the button to activate
  fireEvent.click(buttonElement);

  //check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  //click the checkbox to activate
  fireEvent.click(checkboxElement);

  //check after click - status
  expect(buttonElement).toHaveClass('gray');
  expect(buttonElement).not.toBeEnabled();
  expect(checkboxElement).toBeChecked();

  //click the checkbox again to deactivate
  fireEvent.click(checkboxElement);

  //check after click - status
  expect(buttonElement).toHaveClass('midnight-blue');
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

describe('kebabCaseToTitleCase', () => {
  test('Works for no hyphens', () => {
    expect(kebabCaseToTitleCase('red')).toBe('Red');
  });
  test('Works for one hyphen', () => {
    expect(kebabCaseToTitleCase('midnight-blue')).toBe('Midnight Blue');
  });
  test('Works for multiple hyphens', () => {
    expect(kebabCaseToTitleCase('medium-violet-red')).toBe('Medium Violet Red');
  });
});
