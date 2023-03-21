import { PrismaClient } from '@prisma/client';

export default async function signup(fastify, opts) {
  const { httpErrors, jwt } = fastify;
  const prisma = new PrismaClient();

  fastify.route({
    method: 'GET',
    path: '/signup',
    schema: {
      body: S.object()
        .additionalProperties(false)
        .prop('name', S.string().required())
        .prop('email', S.string().required())
        .prop('password', S.string().required()),
      response: {
        200: S.object()
          .prop('name', S.string())
          .prop('email', S.string())
          .prop('password', S.string()),
      },
    },
    handler: onLogin,
  });

  async function onLogin(req, reply) {
    const { name, email, password } = JSON.parse(request.body);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
