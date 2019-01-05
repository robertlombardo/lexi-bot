const {getRandomArrayElement} = require(`tools/index`)

const text = {}

text.getStartMessage = user => ``+
`Hi <@${user.id}>,

Yesterday the kiosk park aides handed me your note and yellow copy of the citation that you received on 8/6/18 at the Devil's Kitchen parking lot.

Can you please provide the year, make and model of your car so I can verify that I'm talking to the vehicle owner? HINT: Say *lexi i have a [year] [make] [model]*

Sgt. Alexis Dexis
Supervising State Park Officer, Badge 187c-24601
Devil's Kitchen State Park

p.s. Saying *lexi help* will bring up a list of commands you can use.`

text.HI_RESPONSE_GETTERS = [
    user => `sup <@${user.id}>`,
    user => `is that a greeting or are you trying to tell me something, <@${user.id}>?`,
    user => `lo`,
    user => `yes, i am.`,
    user => `stop saying that.`,
    user => `what can i do for you today, <@${user.id}>?`,
    user => `no, there are not an infinite number of these.`,
    user => `<@${user.id}> would you like a cookie?`,
]
text.getRandomHiResponse = (user) => {
    return getRandomArrayElement(text.HI_RESPONSE_GETTERS)(user)
}

text.YES_RESPONSE_GETTERS = [
    user => `Okay.`,
    user => `Gotcha.`,
    user => `Ten four, Elanor.`,
    user => `Aaaaaaaas youuuuuuuu wiiiiiiiiiiiiiiiishh... .. .`,
    user => `Word.`,
    user => `Great.`,
    user => `Suuuuuuuper.`,
    user => `Wonderful.`,
    user => 'Excellent.',
    user => `:disco:`,
    user => `:dancing_panda:`,
    user => `:carlton:`,
    user => `:banana_dance:`,
    user => `:ohyeah:`,
    user => `:metal:`,
]
text.getRandomYesResponse = user => getRandomArrayElement(text.YES_RESPONSE_GETTERS)(user)

text.NO_RESPONSE_GETTERS = [
    user => `I see.`,
    user => `Okay.`,
    user => `Well, I understand where you're coming from.`,
    user => `:hmmmmm:`
]
text.getRandomNoResponse = user => getRandomArrayElement(text.NO_RESPONSE_GETTERS)(user)

text.BOB_STATUSES = [
    `Sales haven't been too good down there lately. Maybe you can get a deal.`,
    `I heard he's been having marriage problems lately.`,
    `Let's just hope he wasn't drinking last night again.`,
    `At the very least we can have a chuckle about that stupid toupee he started wearing.`,
    `I hope he made it home alright from the bar last night.`,
    `Just don't let him talk you into buying him lunch again`,
]
text.getRandomBobStatus = () => {
    return getRandomArrayElement(text.BOB_STATUSES)
}

module.exports = text
