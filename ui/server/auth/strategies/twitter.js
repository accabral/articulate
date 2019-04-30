import {
  AUTH_TWITTER_KEY,
  AUTH_TWITTER_SECRET,
  SESSION_SECRET,
} from '../../../common/env';

export default {
  name: 'twitter',
  scheme: 'bell',
  options: {
    provider: 'twitter',
    password: SESSION_SECRET, // Use something more secure in production
    clientId: AUTH_TWITTER_KEY,
    clientSecret: AUTH_TWITTER_SECRET,
    isSecure: false, // Should be set to true (which is the default) in production,
    config: {
      getMethod: 'account/verify_credentials',
      getParams: {
        include_email: 'true',
        skip_status: 'true',
        include_entities: 'false',
      },
    },
    location: (request) => {
      console.log(`twitter::location`); // TODO: REMOVE!!!!
      // console.log({ info: request.info, headers: request.headers }); // TODO: REMOVE!!!!
      const location = `${request.headers['x-forwarded-proto']}://${request.info.host}${request.path}`;
      console.log({ location }); // TODO: REMOVE!!!!

      return location;
    },
  },
};
