import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Order Phases', async () => {
  const user = userEvent.setup();
  // Render App
  render(<App></App>);

  // Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');

  const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '1');

  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: /Hot fudge/i,
  });
  await user.click(hotFudgeInput);

  // Find and click order Button
  const orderBtn = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderBtn);

  // Check Summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: /Scoops:/i });
  expect(scoopsHeading).toHaveTextContent('6.00');

  const toppingsHeading = screen.getByRole('heading', { name: /Toppings:/i });
  expect(toppingsHeading).toHaveTextContent('1.50');

  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Hot fudge')).toBeInTheDocument();

  //Accept terms and conditions and click button to confirm order
  const confirmTerms = screen.getByRole('checkbox', {
    name: /Terms and Conditions/i,
  });
  await user.click(confirmTerms);
  expect(confirmTerms).toBeChecked();

  const confirmOrder = screen.getByRole('button', { name: /confirm/i });
  await user.click(confirmOrder);

  //expect "loading to show"
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //Confirm order number on confirimation page
  const confirmationHeader = await screen.findByRole('heading', {
    name: /thank/i,
  });
  // expect(loading).not.toBeInTheDocument();
  expect(confirmationHeader).toBeInTheDocument();

  // Clicking 'new order' button on confirmation page
  //Check that scoops and toppings subtotals have been reset
  //------------------------------
  //Do we need any async code?
});
