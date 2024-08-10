import {
  logRoles,
  render,
  screen,
} from '../../../test-utils/testing-library-utils';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.use(http.post('http://localhost:3030/order'), () => {
    return new HttpResponse(null, { status: 500 });
  });

  const { container } = render(<OrderEntry></OrderEntry>);
  const alerts = await screen.findAllByRole('alert');
  // logRoles(container);
  expect(alerts).toHaveLength(2);
});

test('button disabled status depending on scoops ordered or not', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <OrderEntry setOrderPhase={vi.fn()}></OrderEntry>
  );

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  const buttonOrder = screen.getByRole('button', { name: /order sundae/i });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(buttonOrder).toBeDisabled();

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');
  expect(buttonOrder).toBeEnabled();

  //clicking again to delete the scoops ordered
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');
  // logRoles(container);
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(buttonOrder).toBeDisabled();
});
