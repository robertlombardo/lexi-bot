const HelpCommand = {
    getInfo_short   : user => `Display this help text.`,

    handler         : (command_data, slack_client) => {
                        const {user, channel} = command_data

                        let textResponse
                        const command_key_to_read_about = command_data.args[0]
                        
                        if (command_key_to_read_about) {
                            // render the long description of the specified command
                            const COMMANDS = require(`message-handler/commands/index`) // requiring up top is circular
                            const c = COMMANDS[command_key_to_read_about]

                            if (!c) textResponse = `I understand where you're coming from, but I can't help you with that.`
                            else textResponse    = (c.getInfo_long ? c.getInfo_long(user):null) || (c.getInfo_short ? c.getInfo_short(user):null) || `Look just because I know a word doesn't mean I can define it for you.` 
                        } else {
                            textResponse         = `Sorry, <@${user.id}>, there is an official process for getting help.`
                                               +   `\nYou can say:`

                            // render the short_descriptions of all commands
                            const COMMANDS = require(`message-handler/commands/index`) // requiring up top is circular
                            Object.keys(COMMANDS).forEach((command_key) => {
                                const c = COMMANDS[command_key]
                                if (c && c.getInfo_short) textResponse += `\n   - *${command_key}*: ${c.getInfo_short(user)}`
                            })

                            textResponse += `\n_You can also say *lexi help [command]* to get more details._`
                        }

                        return slack_client.chat.postMessage({channel, text: textResponse})
                        .catch(console.error)
                    },
}
module.exports = HelpCommand
