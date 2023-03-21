export default async function signup(fastify, opts) {
  const { httpErrors, jwt } = fastify;

  fastify.route({
    method: 'GET',
    path: '/signup',
    handler: onLogin,
  });

  async function onLogin(req, reply) {
    return {
      signup: 'yes',
    };
  }
}
