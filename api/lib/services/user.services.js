import Schmervice from 'schmervice';
import AddIdentity from './user/user.add-identity.service';
import Create from './user/user.create-account.service';
import FindById from './user/user.find-by-id.service';

module.exports = class UserService extends Schmervice.Service {

    async create() {

        return await Create.apply(this, arguments);
    }

    async findById() {
        return await FindById.apply(this, arguments);
    }

    async findByEmail() {

        throw new Error('not implemented');

    }

    async addIdentity() {

        return await AddIdentity.apply(this, arguments);
    }
};
