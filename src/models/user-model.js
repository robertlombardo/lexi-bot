const fs            = require('fs')

let users = {}

const USERS_FILE = `./db/users.json`
fs.readFile(USERS_FILE, `utf-8`, (users_file_err, data) => {
    if (users_file_err) console.warn({users_file_err})
    else users = JSON.parse(data)

    console.log(`\nsuccessfully read in USERS_FILE: ${USERS_FILE}`)
    // console.info({users})    
})

const UserModel = {  
    getDict: () => users,

    upsert: (user) => {
        users[user.id] = user
        return write()
    },

    upsertBatch: (users_to_change) => {
        Object.assign(users, users_to_change)
        return write()
    },

    NEW_USER_RIDES          : [{year: `2003`, make: `honda`, model: `civic`, parts: []}],
    NEW_USER_LIABILITIES    : [{type: `parking_ticket`, amount: 51.50}],
    NEW_USER_PASSIVE_INCOME : [{type: `job`, name: `Software Developer`, cps: 0.01}],
}
module.exports = UserModel

function write() {
    return fs.writeFile(USERS_FILE, JSON.stringify(users), `utf-8`, () => {
        // console.log(`write successful.)
    })
}
