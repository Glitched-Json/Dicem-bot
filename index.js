const Discord = require("discord.js")
require("dotenv").config()

const Client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})
preset = "!r"

Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}`)
})

Client.on("messageCreate", (message) => {
    if (message.content.startsWith(preset)) {
        message.reply("dice rollin")
    }
})

Client.login(process.env.TOKEN)