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

  //Confirm order number on confirmation page
  const confirmationHeader = await screen.findByText('Thank You', {
    exact: false,
  });
  // expect(loading).not.toBeInTheDocument();
  expect(confirmationHeader).toBeInTheDocument();

  // Clicking 'new order' button on confirmation page
  const createNewOrder = screen.getByRole('button', {
    name: 'Create new order',
  });
  await user.click(createNewOrder);

  //Check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText(/scoops total/i);
  expect(scoopsTotal).toHaveTextContent('0.00');

  const toppingsTotal = await screen.findByText(/toppings total/i);
  expect(toppingsTotal).toHaveTextContent('0.00');

  //------------------------------
  //Do we need any async code?
});

test('Order Phases without toppings', async () => {
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

  // Find and click order Button
  const orderBtn = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderBtn);

  // Check Summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: /Scoops:/i });
  expect(scoopsHeading).toHaveTextContent('6.00');

  const toppingsHeading = screen.queryByRole('heading', { name: /Toppings:/i });
  expect(toppingsHeading).not.toBeInTheDocument();

  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.queryByText('Hot fudge')).not.toBeInTheDocument();
});

test('Order Phases without toppings(ordered then removed)', async () => {
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

  //---------------------------------------
  //Actually not needed to verify the text content of the subtotal because we already checked before
  //Checking totals for check and uncheck topping
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });

  //adding some toppings to check the value update
  const MMsInput = await screen.findByRole('checkbox', { name: /M&Ms/i });
  await user.click(MMsInput);
  expect(MMsInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  //-------------------------
  //verifying uncheck
  await user.click(MMsInput);
  expect(MMsInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //-------------------------
  // Find and click order Button
  const orderBtn = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderBtn);

  // Check Summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: /Scoops:/i });
  expect(scoopsHeading).toHaveTextContent('6.00');

  const toppingsHeading = screen.queryByRole('heading', { name: /Toppings:/i });
  expect(toppingsHeading).not.toBeInTheDocument();

  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.queryByText('Hot fudge')).not.toBeInTheDocument();
});
