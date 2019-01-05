const {MAKES, MODELS}   = require(`constants/index`)
const slugify           = require(`slugify`)

const ValidateVehicle = {
    all: (year, make, model) => {
        return  ValidateVehicle.year(year) && ValidateVehicle.make(make) && ValidateVehicle.model(model)
    },

    year: (val) => {
        const year_as_num = parseInt(val, 10)
        
        return (
            typeof val === 'string'
            && !isNaN(year_as_num)
            && year_as_num >= 1800
            && year_as_num <= new Date().getFullYear() + 5
        )
    },

    make: (val, slugify_val=true) => {
        if (slugify_val) val = slugify(val, {lower: true})

        return Object.keys(MAKES.dict).indexOf(val) > -1
    },

    model: (val, slugify_val=true) => {
        if (slugify_val) val = slugify(val, {lower: true})

        return Object.keys(MODELS.dict).indexOf(val) > -1
    },
}
module.exports = ValidateVehicle
