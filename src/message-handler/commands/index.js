const GoCommand     = require(`./go-command`)
const HelpCommand   = require(`./help-command`)
const HiCommand     = require(`./hi-command`)
const ICommand      = require(`./i-command`)
const NoCommand     = require(`./no-command`)
const StartCommand  = require(`./start-command`)
const StatusCommand = require(`./status-command`)
const YesCommand    = require(`./yes-command`)

module.exports = {
    // breaking the alphabetical rule here in the object keys just to set a more intuitive display order
    // also mapping the command obects to their handles
    help    : HelpCommand,
    start   : StartCommand,

    // game actions
    status  : StatusCommand,
    go      : GoCommand,

    // conversation
    hi      : HiCommand,
    i       : ICommand,
    yes     : YesCommand,
    no      : NoCommand,
}
