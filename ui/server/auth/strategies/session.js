import { SESSION_SECRET } from '../../../common/env';

export default {
  name: 'session',
  scheme: 'cookie',
  options: {

    cookie: {
      password: SESSION_SECRET,
      isSecure: false,
      clearInvalid: true,
      path: '/'
    },
    redirectTo: '/login',
    validateFunc: async (request, session) => {

      console.log(`session::validateFunc`); // TODO: REMOVE!!!!
      console.log({ request, session }); // TODO: REMOVE!!!!

      return { valid: true, credentials: account };
    }
  }
};
