import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3030/scoops', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      {
        name: 'Vanilla',
        imagePath: '/images/vanilla.png',
      },
    ]);
  }),

  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      {
        name: 'M&Ms',
        imagePath: '/images/m-and-ms.png',
      },
      {
        name: 'Hot fudge',
        imagePath: '/images/hot-fudge.png',
      },
    ]);
  }),

  http.post('http://localhost:3030/order', async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345678 }, { status: 201 });
  }),
];
