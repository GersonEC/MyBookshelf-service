export default async function bookshelf(fastify, opts) {
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'POST',
    path: '/bookshelf',
    handler: onSaveBook,
  });

  fastify.route({
    method: 'GET',
    path: '/bookshelf/:userId',
    handler: onUserBookshelf,
  });

  async function onSaveBook(req, reply) {
    const body = JSON.parse(req.body);
    const { book } = body;
    const bookPersisted = await prisma.book.create({
      data: {
        book,
      },
    });
    return bookPersisted;
  }

  async function onSaveToBookshelf(req, reply) {
    return true;
    // try {
    //   const { userId, book } = JSON.parse(
    //     request.body as string
    //   ) as SaveToBookshelfBody;
    //   const data = book;
    //   data.userIDs = [userId];
    //   const persistedBook: Prisma.BookCreateInput = await prisma.book.create({
    //     data,
    //   });
    //   //Update the user with the book id associated
    //   const updateUser = await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       bookIDs: persistedBook.id,
    //     },
    //   });
    //   return persistedBook;
    // } catch (error) {
    //   console.log('##### ERROR ####: ', error);
    //   throw new Error(error as string);
    // }
  }

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
