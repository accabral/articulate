import Joi from 'joi';
import {
    PARAM_EMAIL,
    PARAM_IDENTITY,
    PARAM_LAST_NAME,
    PARAM_NAME,
    PARAM_PROFILE,
    PARAM_PROVIDER,
    PARAM_SECRET,
    PARAM_TOKEN
} from '../../util/constants';

const UserAccountModel = require('../models/user-account.model').schema;
const UserIdentityModel = require('../models/user-identity.model').schema;

const userIdentityParams = {
    [PARAM_PROVIDER]: UserIdentityModel.provider.required(),
    [PARAM_TOKEN]: UserIdentityModel.token.required(),
    [PARAM_SECRET]: UserIdentityModel.secret,
    [PARAM_PROFILE]: UserIdentityModel.profile.required()
};

const userAccountParams = {
    [PARAM_NAME]: UserAccountModel.name.required(),
    [PARAM_LAST_NAME]: UserAccountModel.lastName,
    [PARAM_EMAIL]: UserAccountModel.email.required(),
    [PARAM_IDENTITY]: Joi.object().optional().keys(userIdentityParams)
};

class UserValidate {
    constructor() {
        this.create = {
            payload: (() => {

                return userAccountParams;
            })()
        };

        this.createIdentity = {
            payload: (() => {

                return userIdentityParams;
            })()
        };
    }
}

module.exports = new UserValidate();
