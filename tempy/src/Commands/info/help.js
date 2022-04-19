const { MessageEmbed, MessageActionRow } = require('discord.js');
const config = require('../../../config.json');
const noblox = require("noblox.js");
const fetch = require('node-fetch')
const fs = require('fs')
const Canvas = require('canvas');
const path = require('path')
module.exports = {
    name: 'help',
    aliases: [''],
    permissions: [],
    cooldown: 5,

    async execute(message, args, commandName, client, Discord) {


        const Help = new MessageEmbed()
            .setTitle('Tempy')
            .setDescription(`**List of all cmds**\n\n\`tempy!steal {TYPE} {ASSETID}\`\n\nAvailable types: \`shirt, pants\``)
            .setColor(config.embed_color)
        message.reply({ embeds: [Help] })

    }
};