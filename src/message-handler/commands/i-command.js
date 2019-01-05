const {MAKES, MODELS}       = require(`constants/index`)
const {ValidateVehicle}     = require(`tools/index`)
const {GameStateController} = require(`controllers/index`)

const ICommand = {
    getInfo_short   : user => `Try to express yourself to lexi-bot.`,

    getInfo_long    : user =>   `\n<@${user.id}>'s Unlocked Verbs:`
                            +   `\n====================`
                            +   `\n   - have`
                            +   `\n   - want`,

    handler         : (command_data, slack_client) => {
                        const {user, channel, args} = command_data
                        const verb = args[0]
                        console.log({verb})
                        
                        let textResponse

                        switch (verb) {
                            case `have` :
                                // try to get a valid vehicle year/make/model from the user's statement
                                let year, make, model

                                args.forEach((arg, i) => {
                                    // filter out articles, e.g. `lexi i have a 2008 audi a` or `lexi i have them doohickeys from wheresamuhoosit`
                                    if ( i === 1 
                                        && (    arg === `a` 
                                            ||  arg === `an` 
                                            ||  arg === `the`
                                            ||  arg === `this` 
                                            ||  arg === `that`
                                            ||  arg === `these`
                                            ||  arg === `those`
                                            ||  arg === `them`
                                        )
                                    ) return // i.e. continue

                                         if (ValidateVehicle.year(arg)) year = arg
                                    else if (ValidateVehicle.make(arg)) make = arg
                                    else if (ValidateVehicle.model(arg)) model = arg
                                })
                                console.log({year, make, model})

                                if (year && make && model) {
                                    // see if the stated make, model & year match anything in the user's garage
                                    let matching_ride_from_user_garage = user.rides.find(ride => ride.year === year && ride.make == make && ride.model == model)
                                    console.log({matching_ride_from_user_garage})
                                    if (matching_ride_from_user_garage) {
                                        textResponse = `You do have that car, great.`

                                        GameStateController.checkForWinCondition(command_data, slack_client)
                                    } else {
                                        textResponse = `No you don't. Put the doobie down & say *lexi go garage* to see what you own.`
                                    }
                                } else {
                                    textResponse = `I heard {year: ${year}} {make: ${make}} {model: ${model}}, which isn't valid according to my database.`
                                }
                                break

                            case `want` :
                                textResponse = `We all want things, dude.`
                                break

                            default     : textResponse = `You what?`
                        }

                        slack_client.chat.postMessage({channel, text: textResponse})
                        .catch(console.error)
                    },
}
module.exports = ICommand
