import github from './github';
import session from './session';
import twitter from './twitter';

export default async function (server) {
  await server.auth.strategy(session.name, session.scheme, session.options);
  await server.auth.strategy(twitter.name, twitter.scheme, twitter.options);
  await server.auth.strategy(github.name, github.scheme, github.options);
}
