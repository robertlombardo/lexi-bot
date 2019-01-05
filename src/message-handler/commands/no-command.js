const {getRandomNoResponse} = require(`text`)

const NoCommand = {
    getInfo_short: user => `Say no to something I just said.`,

    getInfo_long: user => `What don't you understand about the word "no"?`,
    
    handler     : (command_data, slack_client) => {
                    const {user, channel} = command_data

                    slack_client.chat.postMessage({channel, text: getRandomNoResponse(user)})
                    .catch(console.error)
                },
}
module.exports = NoCommand
