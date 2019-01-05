const {UserModel} = require(`models/index`)

const GameStateController = {
    checkForWinCondition: (command_data, slack_client) => {
        const {user, channel} = command_data

        let textResponse 

        if (JSON.stringify(user.rides) === JSON.stringify(UserModel.NEW_USER_RIDES)) {
            textResponse =      `What is that, your mother's car? Hahahaahahaha!`
                            +   `\nWhy don't you come back to me when you figure out what is & isn't respectable as a mode of transportation for human beings.`
                            +   `\nTHE PARKING TICKET STANDS.`
                            +   `\n`
                            +   `\n(say *lexi go dealership* to try to find something less pathetic)`
        }

        if (textResponse) {
            setTimeout(() => {
                slack_client.chat.postMessage({channel, text: `:hmmmmm:`})
                .catch(console.error)

                setTimeout(() => {
                    slack_client.chat.postMessage({channel, text: textResponse})
                    .catch(console.error)
                }, 1000)
            }, 1000)


        }
    }
}
module.exports = GameStateController