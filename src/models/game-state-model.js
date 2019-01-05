let now             = new Date().getTime()
let last_updated_at = now
let update_delta, user_update_delta, user

const GameStateModel = {
    getTotalCPS: (user) => {
        return user.passive_income.reduce((total, income_obj) => total + income_obj.cps, 0)
    },

    update: () => {
        now             = new Date().getTime()
        update_delta    = now - last_updated_at
        last_updated_at = now

        const UserModel = require(`./user-model`) // lazy require

        const users = UserModel.getDict()
        Object.keys(users).forEach((user_key) => {
            user = users[user_key]

            user_update_delta       = now - (user.last_updated_at || 0)
            user.last_updated_at    = now

            // TODO - you're not actually using the delta, dummy. do the math.
            user.caysh += GameStateModel.getTotalCPS(user)
        })

        // TODO - throttle more?
        UserModel.upsertBatch(users)
    },
}
module.exports = GameStateModel

// privately kick off the game state update interval
let update_interval = setInterval(GameStateModel.update, 1000)
