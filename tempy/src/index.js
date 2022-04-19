console.clear()
const Discord = require('discord.js');
const { Intents, Collection } = Discord;
const config = require('../config.json')
const allIntents = new Intents(32767);
const client = new Discord.Client({ intents: allIntents });



client.commands = new Collection();
client.cooldowns = new Collection();

['eventHandler', 'commandHandler'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord)
});



client.login(config.bot_token)