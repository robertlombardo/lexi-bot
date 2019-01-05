const {UserController}          = require(`controllers/index`)
const {getQualifiedCarTitle}    = require(`tools/index`)
const COMMANDS                  = require(`./commands/index`)

module.exports = (message, slack_client) => {
    console.info(`message-handler()`)

    const mt_split = message.text.split(` `)
    console.log({mt_split})
    
    const [command_key, ...command_args] = mt_split.slice(1) // remember the first word was `lexi`

    console.log({command_key})
    console.log({command_args})

    const command = COMMANDS[command_key]
    if (command) {
        const user = UserController.get(message.user) || UserController.createNewUser(message.user)

        command.handler({
                user,
                channel : message.channel,
                args    : command_args
            },
            slack_client
        )
    } else {
        slack_client.chat.postMessage({
            channel: message.channel, 
            text: `What are you talking about?`
        })
        .catch(console.error)
    }
}