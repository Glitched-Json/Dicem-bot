//https://discord.com/api/oauth2/authorize?client_id=1028820655333986304&permissions=67584&scope=bot%20applications.commands

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
    
    if (message.content.startsWith("Dicem change prefix:")) {
        message.reply("Dicem prefix changed to: "+(prefix = message.content.substring(20).trim()))
    } else if (message.content == "Dicem get prefix") {
        message.reply("Dicem prefix is currently: "+prefix)
    } else if (message.content == "Dicem reset prefix") {
        message.reply("Dicem prefix reverted back to: "+(prefix = '!r'))
    } else if (message.content.startsWith(prefix)) {
        const msg = message.content.slice(prefix.length).trim()
        message.reply(calculate(msg))
    }
})

function calculate(msg) {
    ooo = [
        [
            "d",
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
    message = Array.from({length: tokens.toString().match(/d/g)}, (v, i) => null)
    
    for (index = -1, i = 0; i<ooo.length; i++) {
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
                        reduced = arr.splice(parse(b, 1))
                        r = arr.toString()
                        message[index] = message[index].map(x => {if (reduced.map(x => x.toString()).includes(x)) return '~~'+x+'~~'; else return x;})
                        break;
                    case "kl":
                        arr = a.split(',').map(x => parseInt(x)).sort(function(a, b){return a-b})
                        reduced = arr.splice(parse(b, 1))
                        r = arr.toString()
                        message[index] = message[index].map(x => {if (reduced.map(x => x.toString()).includes(x)) return '~~'+x+'~~'; else return x;})
                        break;
                    case "min":
                        if (b == '' || isNaN(parse(b))) {
                            r = a.split(',').map(x => parseInt(x)).sort(function(a, b){return a-b})[0].toString()
                            message[index] = message[index].map(x => x.replaceAll('~','')).map(x => {if (x!=r) return "~~"+x+"~~"; else return x})
                        } else {
                            m = Math.max(parse(a), parse(b))
                            r = m.toString()
                            if (m = parse(b)) message[index] = "~~"+message[index].map(x => x.replaceAll('~', '')).toString().replaceAll(',',', ')+"~~"
                        } break;
                    case "max":
                        if (b == '' || isNaN(parse(b))) {
                            r = a.split(',').map(x => parseInt(x)).sort(function(a, b){return b-a})[0].toString()
                            message[index] = message[index].map(x => x.replaceAll('~','')).map(x => {if (x!=r) return "~~"+x+"~~"; else return x})
                        } else {
                            m = Math.min(parse(a), parse(b))
                            r = m.toString()
                            if (m = parse(b)) message[index] = "~~"+message[index].map(x => x.replaceAll('~', '')).toString().replaceAll(',',', ')+"~~"
                        } break;
                    case "d":
                        r = Array.from({length: parse(a, 1)}, (v, i) => Math.floor(Math.random()*parse(b, 20)+1)).toString()
                        message[++index] = r.split(',')
                        break;
                }
                tokens.splice(j+1, 1)
                tokens.splice(j, 1, r)
                tokens.splice(j-1, 1)
                j=Math.max(j-1, 0)
            }
        }
    }

    function parse(str, def = 0) {
        result = 0
        if (str.includes(',')) str.split(',').forEach(x => result += parseInt(x))
        else result = parseInt(str)

        if (isNaN(result)) return def
        else return result
    }

    function regexIndexOf(text, reg, i) {
    var indexInSuffix = text.slice(i).search(reg);
    return indexInSuffix < 0 ? indexInSuffix : indexInSuffix + i;
}
    
    temp = msg; format = ""; res = temp.match(/([0-9]*d[^+-\/*]*)/g);
    message.forEach((x, i) => {format += temp.substring(0, temp.search(res[i])+res[i].length)+"("+x.toString().replaceAll(",",", ")+")"; temp = temp.slice(temp.search(res[i])+res[i].length)})
    format += temp
    return format + "\nTotal: " + parse(tokens.toString()).toString()
}

client.login(process.env.TOKEN)