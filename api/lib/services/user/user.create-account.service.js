import { MODEL_USER_ACCOUNT } from '../../../util/constants';
import RedisErrorHandler from '../../errors/redis.error-handler';

module.exports = async function ({ data, identity = null, returnModel = false }) {

    const { redis } = this.server.app;
    const { userService } = await this.server.services();

    const model = await redis.factory(MODEL_USER_ACCOUNT);
    try {
        await model.createInstance({ data });
        const properties = model.allProperties();
        if (identity) {
            await userService.addIdentity({ identityData: identity, UserAccountModel: model });
            properties.identities = [identity];
        }
        return returnModel ? model : properties;
    }
    catch (error) {
        throw RedisErrorHandler({ error });
    }
};
