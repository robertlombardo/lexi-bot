// set up module lookup via package.json, e.g. "_moduleDirectories": ["src"]
require('module-alias/register')

// external dependencies
const slackEventsApi  = require(`@slack/events-api`)
const SlackClient     = require(`@slack/client`).WebClient
const passport        = require(`passport`)
const SlackStrategy   = require(`@aoberoi/passport-slack`).default.Strategy
const http            = require(`http`)
const express         = require(`express`)
const request         = require(`request`)
const fs              = require('fs')

// internal dependencies
const messageHandler  = require(`message-handler/index.js`)

// *** Initialize event adapter using signing secret from environment variables ***
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
    includeBody: true
})

// Initialize a data structures to store team authorization info (typically stored in a database)
const BOT_AUTH_FILE = `./db/bot-authorizations.json`
let botAuthorizations = {}
fs.readFile(BOT_AUTH_FILE, `utf-8`, (bot_auth_file_err, data) => {
    if (bot_auth_file_err) console.warn({bot_auth_file_err})
    else botAuthorizations = JSON.parse(data)

    console.info({botAuthorizations})    
})

// Helpers to cache and lookup appropriate client
// NOTE: Not enterprise-ready. if the event was triggered inside a shared channel, this lookup
// could fail but there might be a suitable client from one of the other teams that is within that
// shared channel.
const clients = {};
function getClientByTeamId(teamId) {
    // console.log(`\ngetClientByTeamId()`)
    // console.log({teamId})

    // console.log({clients})
    // console.log({botAuthorizations})

    if (!clients[teamId] && botAuthorizations[teamId]) {
        clients[teamId] = new SlackClient(botAuthorizations[teamId])
    }

    if (clients[teamId]) {
        return clients[teamId]
    }

    return null;
}

// Initialize Add to Slack (OAuth) helpers
passport.use(new SlackStrategy({
        clientID: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        skipUserProfile: true,
    }, (accessToken, scopes, team, extra, profiles, done) => {
        console.log(`\npassports.use() callback`)
        console.log({accessToken})
        console.log({scopes})
        console.log({team})
        console.log({extra})
        console.log({profiles})
        botAuthorizations[team.id] = extra.bot.accessToken;

        fs.writeFile(BOT_AUTH_FILE, JSON.stringify(botAuthorizations), 'utf8')

        done(null, {});
    })
)

// Initialize an Express application
const app = express();

// Plug the Add to Slack (OAuth) helpers into the express app
app.use(passport.initialize())
app.get('/', (req, res) => {
    res.send('<a href="/auth/slack"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>');
})
app.get('/auth/slack', passport.authenticate('slack', {
    scope: ['bot']
}))
app.get('/auth/slack/callback',
    passport.authenticate('slack', { session: false }),
    (req, res) => {
        console.info(`passport.authenticate() success!`)
        res.send('<p>lexi-bot was successfully installed on your team.</p>');
    },
    (err, req, res, next) => {
        console.info(`passport.authenticate() failure!`)
        res.status(500).send(`<p>lexi-bot failed to install</p> <pre>${err}</pre>`);
    }
);

// *** Plug the event adapter into the express app as middleware ***
app.use('/slack/events', slackEvents.expressMiddleware());

// *** Attach listeners to the event adapter ***
slackEvents.on('message', (message, body) => {
    console.log(`\nA new message was heard by lexi-bot!`)
    console.log(`======================================`)
    console.log({message})
    // console.log({body})

    // Only deal with messages that have no subtype (plain messages) and start with `lexi`
    if (!message.subtype && message.text.indexOf(`lexi`) === 0) {
        // Initialize a client
        const slack_client = getClientByTeamId(body.team_id)
        if (!slack_client) return console.error(`\nNo bot authorization found for this team_id.`)

        return messageHandler(message, slack_client)
    }
})

// // *** Responding to reactions with the same emoji ***
// slackEvents.on('reaction_added', (event, body) => {
//   // Initialize a client
//   const slack = getClientByTeamId(body.team_id);
//   // Handle initialization failure
//   if (!slack) {
//     return console.error('No authorization found for this team. Did you install this app again after restarting?');
//   }
//   // Respond to the reaction back with the same emoji
//   slack.chat.postMessage(event.item.channel, `:${event.reaction}:`)
//     .catch(console.error);
// });

// *** Handle errors ***
slackEvents.on('error', (app_err) => {
  console.log(`\n`)
  console.log({app_err})

  if (app_err.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
    // This error type also has a `body` propery containing the request body which failed verification.
    console.error(`An unverified request was sent to the Slack events Request URL. Request body: ${JSON.stringify(app_err.body)}`)
  } else {
    console.error(`An error occurred while handling a Slack event: ${app_err.message}`);
  }
});

// Start the express application
const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => {
  console.log(`\n\nserver listening on port ${port}`);
});