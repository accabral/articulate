import Boom from 'boom';
import _ from 'lodash';
import { PROVIDERS } from '../../common/env';
import api from '../services/api';

const handler = async (request, h) => {
  try {
    if (!request.auth.isAuthenticated) {
      return h(Boom.unauthorized(`Authentication failed: ${request.auth.error.message}`));
    }

    const { profile, token, secret, provider } = request.auth.credentials;
    const data = {
      name: profile.displayName,
      email: profile.raw.email,
      identity: {
        provider,
        token,
        secret,
        profile
      }
    };
    let user = await api.get(`/user/search/email/${data.email}`);
    if (user && !_.isNil(user.id)) {
      const identities = await api.get(`/user/${user.id}/identity`);
      const existing = _.find(identities.data, { provider });
      if (!existing) {
        await api.post(`/user/${user.id}/identity`, data.identity);
      }
    }
    else {
      user = await api.post('/user', data);
    }

    const credentials = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    await request.cookieAuth.set(credentials);
    return h.redirect('/');
  }
  catch (err) {
    console.error(err);
  }

};
const authRoutes = PROVIDERS.map((provider) => {
  return {
    method: 'GET',
    path: `/auth/${provider}`,
    config: {
      auth: provider,
      handler
    }
  };
});
module.exports = [
  ...authRoutes,
  {
    method: 'GET',
    path: '/session',
    config: {
      auth: 'session', // <-- require a session for this, so we have access to the twitter profile
      handler: (request, h) => {
        console.log(`auth.route::session::handler`); // TODO: REMOVE!!!!
        console.log(request.auth); // TODO: REMOVE!!!!
        // Return a message using the information from the session
        return `Hello, ${request.auth.credentials.name}!`;
      }
    }
  }
];
