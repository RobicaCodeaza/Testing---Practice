import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('Checkbox & Button Flow', () => {
  render(<SummaryForm></SummaryForm>);

  const checkboxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  //check initial status
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();

  //check status after click
  fireEvent.click(checkboxElement);
  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toBeEnabled();

  //click the checkbox again to deactivate
  fireEvent.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});
