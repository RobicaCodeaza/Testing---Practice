import { render, screen } from '../../../test-utils/testing-library-utils';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';
import OrderEntry from '../OrderEntry';

test.only('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops'),
    () => {
      return new HttpResponse(null, { status: 500 });
    },
    http.get('http://localhost:3030/toppings'),
    () => {
      return new HttpResponse(null, { status: 500 });
    }
  );

  const { container } = render(<OrderEntry></OrderEntry>);
  const alerts = await screen.findAllByRole('alert');
  // logRoles(container);
  expect(alerts).toHaveLength(2);
});

test('test 2', () => {});
