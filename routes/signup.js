import { PrismaClient } from '@prisma/client';
import S from 'fluent-json-schema';

export default async function signup(fastify, opts) {
  const prisma = new PrismaClient();

  fastify.route({
    method: 'POST',
    path: '/signup',
    schema: {
      body: S.string(),
        // .additionalProperties(false)
        // .prop('email', S.string().required())
        // .prop('password', S.string().required()),
      response: {
        201: S.object()
          .prop('id', S.string())
          .prop('email', S.string())
          .prop('password', S.string()),
      },
    },
    handler: onSignup,
  });

  async function onSignup(req, reply) {
    const body = JSON.parse(req.body);
    console.log("####     BODY  ######: ", body)
    const { email, password } = body;
    console.log("####     email  ######: ", email)
    console.log("####     password  ######: ", password)

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  }
}
