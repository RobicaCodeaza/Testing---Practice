import Options from '../Options';
import { screen, render } from '../../../test-utils/testing-library-utils';

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
