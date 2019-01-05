const {getPriceString} = require(`tools/index`)
const {GameStateModel} = require(`models/index`)

const StatusCommand = {
    getInfo_short   : user => `See how much caysh you have, and any vehicle upgrades in progress.`,

    handler         : (command_data, slack_client) => {
                        const {user, channel} = command_data

                        let textResponse    = `\n<@${user.id}>'s Status:`
                                            + `\n====================`
                                            + `\n*caysh:* ${getPriceString(user.caysh || 0)}`
                                            + `\n*income:* ${GameStateModel.getTotalCPS(user)} caysh per second`

                        return slack_client.chat.postMessage({channel, text: textResponse})
                        .catch(console.error)
                    },
}
module.exports = StatusCommand
