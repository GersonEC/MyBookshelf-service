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
    method: 'DELETE',
    path: '/bookshelf',
    handler: onRemoveFromBookshelf,
  });

  fastify.route({
    method: 'GET',
    path: '/bookshelf/:userId',
    handler: onUserBookshelf,
  });

  async function onSaveToBookshelf(req, reply) {
    try {
      const { userId, book } = JSON.parse(req.body);
      const itAlreadyExist = await prisma.book.findUnique({
        where: {
          id: book.id,
        },
      });
      if (!itAlreadyExist) {
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
      } else {
        const updatedBook = await prisma.book.update({
          where: {
            id: book.id,
          },
          data: {
            users: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return updatedBook;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function onRemoveFromBookshelf(req, reply) {
    try {
      const { userId, bookId } = JSON.parse(req.body);
      const bookToDelete = await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          books: {
            disconnect: [
              {
                id: bookId,
              },
            ],
          },
        },
      });
      return bookToDelete;
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
