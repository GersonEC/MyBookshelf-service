import AutoLoad from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import Sensible from '@fastify/sensible';
import { join } from 'desm';

export default async function app(fastify, opts) {
  fastify.register(Sensible);

  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
  });

  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
  });

  fastify.register(fastifyCors, {
    origin: 'http://localhost:3000',
  });
}
