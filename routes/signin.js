import { PrismaClient } from '@prisma/client';

export default async function signin(fastify, opts) {
  const prisma = new PrismaClient();
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'POST',
    path: '/signin',
    handler: onSignin,
  });

  async function onSignin(req, reply) {
    try {
      const { email, password } = JSON.parse(req.body);
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      req.log.error(error);
      throw new Error(error);
    }
  }
}
