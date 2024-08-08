import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('Update Scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='scoops'></Options>);

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('4.00');
});

test('Update Topping subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='toppings'></Options>);

  //making sure toppings subtotal starts at 0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //adding some toppings to check the value update
  const MMsInput = await screen.findByRole('checkbox', { name: /M&Ms/i });
  await user.click(MMsInput);
  expect(MMsInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  //verifying uncheck
  await user.click(MMsInput);
  expect(MMsInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //adding some toppings to check the value update
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeInput);
  expect(hotFudgeInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  //verifying uncheck
  await user.click(hotFudgeInput);
  expect(hotFudgeInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //having both of the inputs checked
  await user.click(MMsInput);
  await user.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });
    expect(grandTotal).toHaveTextContent('0.00');
  });
  test('grand total updates properly if scoop added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    //Add Scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    //Add Topping
    const hotFudgeInput = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    await user.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if topping added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    //Add Topping
    const hotFudgeInput = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    await user.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();
    expect(grandTotal).toHaveTextContent('1.50');

    //Add Scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if an item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    //Add Scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    //Add Topping
    const hotFudgeInput = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    await user.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();
    expect(grandTotal).toHaveTextContent('5.50');

    //Unchecking Topping
    await user.click(hotFudgeInput);
    expect(hotFudgeInput).not.toBeChecked();
    expect(grandTotal).toHaveTextContent('4.00');

    //Unchecking Scoop
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(hotFudgeInput).not.toBeChecked();
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
