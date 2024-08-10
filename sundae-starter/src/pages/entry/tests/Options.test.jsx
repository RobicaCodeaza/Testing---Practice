import Options from '../Options';
import { screen, render } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

test('Displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops'></Options>);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages?.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image fro each topping option from the server', async () => {
  render(<Options optionType='toppings'></Options>);

  //find imgs
  const toppingsImgs = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingsImgs).toHaveLength(2);

  // confirm alt text of imgs
  const altText = toppingsImgs.map((el) => el.alt);
  expect(altText).toEqual(['M&Ms topping', 'Hot fudge topping']);
});

test('total doesnt change when adding wrong input', async () => {
  const user = userEvent.setup();
  render(<Options optionType={'scoops'}></Options>);

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //clicking again to check invalid input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoops to 1 and check subtotal
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //updating chocolate scoops
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');

  //clicking again to check invalid input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(scoopsSubtotal).toHaveTextContent('4.00');
});
