import Fastify from 'fastify';
import t from 'tap';
import App from '../app.js';

t.test('Basic', async (t) => {
  const fastify = Fastify();
  await fastify.register(App);

  const response = await fastify.inject({
    method: 'GET',
    path: '/signup',
  });

  t.match(response.json(), { signup: 'yes' });
});
