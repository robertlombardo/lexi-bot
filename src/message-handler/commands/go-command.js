const {
    getQualifiedCarTitle,
    getPriceString
}                               = require(`tools/index`)
const {getRandomBobStatus}      = require(`text`)
const {DealershipModel}         = require(`models/index`)

const GoCommand = {
    getInfo_short   : user => `Go somewhere.`,

    getInfo_long    : user =>   `Places <@${user.id}> Can Go:`
                              + `\n====================`
                              + `\n   - garage`
                              + `\n   - store`
                              + `\n   - dealership`,

    handler         : (command_data, slack_client) => {
                        const {user, channel, args} = command_data

                        console.log(`current user location: ${user.location}`)

                        const destination = args[0]
                        let travel_success = false
                        let textResponse

                        switch (destination) {
                            case `garage`       :
                                textResponse    = `\nCars in <@${user.id}>'s Garage:`
                                                + `\n====================`

                                const {rides} = user
                                rides.forEach((ride, i) => {
                                    const {year, make, model} = ride
                                    textResponse += `\n[${i+1}]: ${getQualifiedCarTitle(year, make, model)}`
                                })

                                travel_success = true
                                break

                            case `store`        :
                                textResponse    =   `Let's see if Auto Tinker Town on Darby Street has what you're looking for...`
                                                +   `\n<Under Construction>`

                                travel_success = true
                                break
                            
                            case `dealership`   :
                                textResponse    =   `Let's go see Bob the car dealer. ${getRandomBobStatus()}`
                                                +   `\n`
                                                +   `\nCars for Sale:`
                                                +   `\n====================`

                                const cars_for_sale = DealershipModel.getCarsForSale(user)
                                console.log({cars_for_sale})
                                cars_for_sale.forEach((car, i) => {
                                    console.log({car})
                                    const {year, make, model} = car
                                    console.log({year, make, model})
                                    textResponse += `\n[${i+1}]: ${getQualifiedCarTitle(year, make, model)} (*${getPriceString(car.price.caysh)} caysh)*`
                                })
                                
                                travel_success = true
                                break

                            default: textResponse = `You can't go there.`
                        }

                        if (travel_success) user.location = destination

                        slack_client.chat.postMessage({channel, text: textResponse})
                        .catch(console.error)
                    },
}
module.exports = GoCommand
