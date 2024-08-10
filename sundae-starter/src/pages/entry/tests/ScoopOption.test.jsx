import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';
import ScoopOptions from '../ScoopOption';
import Options from '../Options';

test('Red Input - Invalid data', async () => {
  render(<Options optionType='scoops'></Options>);
  const user = userEvent.setup();
  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(vanillaInput).not.toHaveClass('is-invalid');

  //Negative input test
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  //Decimal input test
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  //too big number input test
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  //correct input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(vanillaInput).not.toHaveClass('is-invalid');

  // logRoles(container);
});
