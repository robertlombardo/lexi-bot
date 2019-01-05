const {UserController}  = require(`controllers/index`)
const {getStartMessage} = require(`text`)

const StartCommand = {
    getInfo_short   : user => `Start a new game.`,

    handler         : (command_data, slack_client) => {
                        const {user, channel} = command_data

                        UserController.createNewUser(user.id)

                        slack_client.chat.postMessage({channel, text: getStartMessage(user)})
                        .catch(console.error)
                    }
}
module.exports = StartCommand
