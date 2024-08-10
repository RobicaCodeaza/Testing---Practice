import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from '../../../test-utils/testing-library-utils';
import OrderConfirmation from '../OrderConfirmation';

test('handles error for scoops and toppings routes', async () => {
  server.use(
    http.get('http://localhost:3030/scoops'),
    () => {
      return new HttpResponse(null, { status: 500 });
    },
    http.post('http://localhost:3030/toppings'),
    () => {
      return new HttpResponse(null, { status: 500 });
    }
  );

  const { container } = render(<OrderConfirmation></OrderConfirmation>);
  const alerts = await screen.findAllByRole('alert');
  // logRoles(container);
  expect(alerts).toHaveLength(1);
});
