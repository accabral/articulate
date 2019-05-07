import api from '../../services/api';

export default {
  name: 'simple',
  scheme: 'basic',
  options: {
    validate: async (request, username, password, h) => {


      const user = await api.get(`/user/search/email/${username}`);
      if (!user) {
        return { credentials: null, isValid: false };
      }

      const isValid = password === user.password;
      const credentials = { id: user.id, name: user.name };
      return { isValid, credentials };
    },
  },
};
