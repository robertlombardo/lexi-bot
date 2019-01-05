const {MAKES, MODELS}                           = require(`constants/index`)
const {ValidateVehicle, getRandomArrayElement}  = require(`tools/index`)
const slugify                                   = require(`slugify`)

const DealershipModel = {
    PUBLIC_INVENTORY: [
        generateRandomVehicle(),
        generateRandomVehicle(),
        generateRandomVehicle(),
        generateRandomVehicle(),
        generateRandomVehicle(),

    ],

    getCarsForSale: user => [].concat(DealershipModel.PUBLIC_INVENTORY, user.available_deals || []),
}
console.log('\n\n\nxxxxxxxxxxxxxxxxxx')
console.log(DealershipModel.PUBLIC_INVENTORY)
module.exports = DealershipModel

function generateRandomVehicle() {
    return {
        year    : generateRandomVehicleYear(),
        make    : generateRandomVehicleMake(),
        model   : generateRandomVehicleModel(),
        price   : {caysh: Math.floor(572.14 + Math.random()*234567)}
    }
}

function generateRandomVehicleYear(future_index=1) {
    const THIS_YEAR = new Date().getFullYear()
    return 1900 + Math.floor(Math.random()*(THIS_YEAR + future_index - 1900))
}

function generateRandomVehicleMake(filter) {
    return slugify(getRandomArrayElement(MAKES.list), {lower: true})
}

function generateRandomVehicleModel(filter) {
    return slugify(getRandomArrayElement(MODELS.list), {lower: true})
}