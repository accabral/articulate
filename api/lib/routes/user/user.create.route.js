import Boom from 'boom';
import { ROUTE_USER_ACCOUNT } from '../../../util/constants';
import UserValidator from '../../validators/user.validator';

//const logger = require('../../../util/logger')({ name: `route:agent:create` });

module.exports = {
    method: 'post',
    path: `/${ROUTE_USER_ACCOUNT}`,
    options: {
        tags: ['api'],
        validate: UserValidator.create,
        handler: async (request) => {

            const { userService } = await request.services();
            try {
                const { identity, ...rest } = request.payload;
                return await userService.create({ data: rest, identity });
            }
            catch ({ message, statusCode }) {
                return new Boom(message, { statusCode });
            }
        }
    }
};
