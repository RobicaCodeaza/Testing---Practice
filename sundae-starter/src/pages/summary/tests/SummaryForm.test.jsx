import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Checkbox & Button Flow initial status', () => {
  render(<SummaryForm></SummaryForm>);

  const checkboxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  //check initial status
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test('Checkbox & Button flow when clicking checkbox', async () => {
  render(<SummaryForm></SummaryForm>);

  const checkboxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  const user = userEvent.setup();

  //check status after click
  // fireEvent.click(checkboxElement);
  await user.click(checkboxElement);

  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toBeEnabled();

  //click the checkbox again to deactivate
  // fireEvent.click(checkboxElement);
  await user.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test('Popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm></SummaryForm>);

  //Initial  - Finding Existing and Inexisting Elements without throwing error on inexisting ones
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  // Popover starts out hidden
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears on mouseover of checkbox label
  await user.hover(termsAndConditions); // then need to find if the element exists because on inital status it wont exist
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // Popover disappears when we mouse out
  await user.unhover(termsAndConditions); // then need to find if the element exists because on inital status it wont exist
  expect(popover).not.toBeInTheDocument();
});
