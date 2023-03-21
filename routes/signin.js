export default async function signin(fastify, opts) {
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'POST',
    path: '/signin',
    handler: onSignin,
  });

  async function onSignin(req, reply) {
    try {
      const { email, password } = JSON.parse(request.body);
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      request.log.error(error);
      throw new Error(error);
    }
  }
}
