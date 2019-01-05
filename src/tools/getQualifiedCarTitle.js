const {MAKES, MODELS} = require(`constants/index.js`)

module.exports = (year, make, model) => {
    console.log(`MAKES.dict[make]:`, MAKES.dict[make])
    console.log(`MODELS.dict[model]:`, MODELS.dict[model])

    const yearTitle     = year  ? year + ` ` : ``
    const makeTitle     = make  ? MAKES.dict[make] + ` ` : `` 
    const modelTitle    = model ? MODELS.dict[model] : ``
    
    return yearTitle + makeTitle + modelTitle
}
