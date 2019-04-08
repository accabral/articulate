import {
    MODEL_USER_ACCOUNT,
    MODEL_USER_IDENTITY
} from '../../../util/constants';
import RedisErrorHandler from '../../errors/redis.error-handler';

module.exports = async function ({ id, identityData, UserAccountModel = null, returnModel = false }) {

    const { redis } = this.server.app;
    const { globalService } = await this.server.services();
    UserAccountModel = UserAccountModel || await globalService.findById({ id, model: MODEL_USER_ACCOUNT, returnModel: true });

    const model = await redis.factory(MODEL_USER_IDENTITY);
    try {
        await model.createInstance({ data: identityData });
        await UserAccountModel.link(model, MODEL_USER_IDENTITY);
        await UserAccountModel.save();
        return returnModel ? model : model.allProperties();
    }
    catch (error) {
        throw RedisErrorHandler({ error });
    }
};
