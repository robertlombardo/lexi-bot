const {getRandomHiResponse} = require(`text`)

const HiCommand = {
    getInfo_long: user => `Uh... the thing people say to each other?`,
    handler     : (command_data, slack_client) => {
                    const {user, channel} = command_data

                    slack_client.chat.postMessage({channel, text: getRandomHiResponse(user)})
                    .catch(console.error)
                },
}
module.exports = HiCommand
