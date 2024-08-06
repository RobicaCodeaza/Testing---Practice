import Options from '../Options';
import { screen, render } from '@testing-library/react';

test('Displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops'></Options>);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages?.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
