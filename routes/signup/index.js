import S from 'fluent-json-schema';

export default async function signup(fastify, options) {
  fastify.post(
    '/signup',
    {
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
    },
    async (request, reply) => {
      return { signup: true };
    }
  );
}
