import { MODEL_USER_IDENTITY } from '../../../util/constants';
import RedisErrorHandler from '../../errors/redis.error-handler';

module.exports = async function ({ id, includeIdentity = false, returnModel = false }) {

    const { redis } = this.server.app;
    const { globalService } = await request.services();
    try {
        const Model = await redis.factory(model, id);
        if (includeIdentity) {
            const linkedModels = await globalService.loadAllLinked({
                parentModel: Model,
                model: MODEL_USER_IDENTITY
            });
            const properties = Model.allProperties();
            properties.identities = linkedModels;
            return properties;
        }
        return returnModel ? Model : Model.allProperties();
    }
    catch (error) {
        throw RedisErrorHandler({ error });
    }
};
