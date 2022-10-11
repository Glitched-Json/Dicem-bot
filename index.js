const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "MESSAGE_CONTENT"
    ]
})
prefix = "!r"

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (!message.guild) return
    if (message.author.bot) return
    
    if (message.content.startsWith(prefix)) {
        const msg = message.content.slice(prefix.length).trim()
        message.reply(calculate(msg).toString())
    } else if (message.content.startsWith("Dicem change prefix:")) {
        prefix = message.content.substring(20)
    }
})

function calculate(msg) {
    ooo = [
        [
            "d"
        ],
        [
            "kh",
            "kl",
            "min",
            "max"
        ],
        [
            "*",
            "/"
        ],
        [
            "+",
            "-"
        ]
    ]
    tokens = msg.split(/([+-/*d]|kh|kl|min|max)/g)

    for (i = 0; i<ooo.length; i++) {
        for (j = 0; j<tokens.length; j++) {
            if (ooo[i].includes(tokens[j])) {
                a = tokens[j-1]
                b = tokens[j+1]
                switch (tokens[j]) {
                    case "+":
                        r = (parse(a)+parse(b)).toString()
                        break;
                    case "-":
                        r = (parse(a)-parse(b)).toString()
                        break;
                    case "/":
                        r = (parse(a)/parse(b)).toString()
                        break;
                    case "*":
                        r = (parse(a)*parse(b)).toString()
                        break;
                    case "kh":
                        arr = a.split(',').map(x => parseInt(x)).sort(function(a, b){return b-a})
                        arr.splice(parse(b, 1))
                        r = arr.toString()
                        break;
                    case "kl":
                        arr = a.split(',').map(x => parseInt(x)).sort(function(a, b){return a-b})
                        arr.splice(parse(b, 1))
                        r = arr.toString()
                        break;
                    case "min":
                        if (b == '' || isNaN(parse(b)))
                            r = a.split(',').map(x => parseInt(x)).sort(function(a, b){return a-b})[0].toString()
                        else
                            r = Math.max(parse(a), parse(b)).toString()
                        break;
                    case "max":
                        if (b == '' || isNaN(parse(b))) 
                            r = a.split(',').map(x => parseInt(x)).sort(function(a, b){return b-a})[0].toString()
                        else
                            r = Math.min(parse(a), parse(b)).toString()
                        break;
                    case "d":
                        r = Array.from({length: parse(a, 1)}, (v, i) => Math.floor(Math.random()*parse(b, 20)+1)).toString()
                        break;
                }
                tokens.splice(j+1, 1)
                tokens.splice(j, 1, r)
                tokens.splice(j-1, 1)
                j=Math.max(j-1, 0)
                console.info(tokens)
            }
        }
    }

    function parse(str, def = 0) {
        result = 0
        if (str.includes(',')) str.split(',').forEach(x => {result += parseInt(x)})
        else result = parseInt(str)

        if (isNaN(result)) return def
        else return result
    }

    return parse(tokens)
}

client.login(process.env.TOKEN)