export default async function users(fastify, opts) {
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'GET',
    path: '/users/:userId',
    handler: onGetUser,
  });

  async function onGetUser(req, reply) {
    try {
      const { userId } = request.params;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log('##### ERROR ####: ', error);
      throw new Error(error);
    }
  }
}
