const {getRandomYesResponse} = require(`text`)

const YesCommand = {
    getInfo_short: user => `Say yes to something I just said.`,

    getInfo_long: user => `What don't you understand about the word "yes"?`,

    handler     : (command_data, slack_client) => {
                    const {user, channel} = command_data

                    slack_client.chat.postMessage({channel, text: getRandomYesResponse(user)})
                    .catch(console.error)
                },
}
module.exports = YesCommand
