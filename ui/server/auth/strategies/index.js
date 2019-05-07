import github from './github';
import session from './session';
import simple from './simple';
import twitter from './twitter';

export default async function(server) {
  await [
    github,
    session,
    twitter,
    simple,
  ].forEach(
    async ({ name, scheme, options }) => {
      await server.auth.strategy(name, scheme, options);
    });
}
