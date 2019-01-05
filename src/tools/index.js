const getQualifiedCarTitle  = require(`./getQualifiedCarTitle`)
const ValidateVehicle       = require(`./validate-vehicle`)

module.exports = {
    getQualifiedCarTitle,
    getPriceString          : num   => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, `,`),
    getRandomArrayElement   : array => array[Math.floor(Math.random()*array.length)],
    ValidateVehicle,
}
