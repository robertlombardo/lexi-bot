const {UserModel}   = require(`models/index`)

const UserController = {
    createNewUser   : (id) => {
                        const new_user = {
                            id,
                            caysh           : 1984,
                            rides           : UserModel.NEW_USER_RIDES,
                            liabilities     : UserModel.NEW_USER_LIABILITIES,
                            passive_income  : UserModel.NEW_USER_PASSIVE_INCOME,
                        }

                        UserModel.upsert(new_user)

                        return new_user
                    },

    get             : id => UserModel.getDict()[id],

    getAll          : () => UserModel.getDict(),
}
module.exports = UserController

