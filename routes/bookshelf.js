export default async function bookshelf(fastify, opts) {
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'GET',
    path: '/bookshelf/:userId',
    handler: onUserBookshelf,
  });

  async function onUserBookshelf(req, reply) {
    const { userId } = request.params;
    const books = await prisma.book.findMany({
      where: {
        userIDs: {
          has: userId,
        },
      },
    });
    return books;
  }
}
