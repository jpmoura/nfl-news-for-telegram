const botConfig = require('./bot')
const nflConfig = require('./nfl')
const fantasyConfig = require('./fantasy')
const twitterConfig = require('./twitter')

module.exports = {
    bot: botConfig,
    twitter: twitterConfig,
    fantasy: fantasyConfig,
    nfl: nflConfig
}
