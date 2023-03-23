import { PrismaClient } from '@prisma/client';

export default async function bookshelf(fastify, opts) {
  const prisma = new PrismaClient();
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'POST',
    path: '/bookshelf',
    handler: onSaveToBookshelf,
  });

  fastify.route({
    method: 'GET',
    path: '/bookshelf/:userId',
    handler: onUserBookshelf,
  });

  async function onSaveToBookshelf(req, reply) {
    try {
      const { userId, book } = JSON.parse(req.body);
      const persistedBook = await prisma.book.create({
        data: {
          ...book,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return persistedBook;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function onUserBookshelf(req, reply) {
    const { userId } = req.params;
    const result = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        books: true,
      },
    });
    const { books } = result[0];
    return books;
  }
}
