const { MessageEmbed, MessageActionRow } = require('discord.js');
const config = require('../../../config.json');
const noblox = require("noblox.js");
const fetch = require('node-fetch')
const fs = require('fs')
const Canvas = require('canvas');
const path = require('path')
module.exports = {
    name: 'steal',
    aliases: [''],
    permissions: [],
    cooldown: 5,

    async execute(message, args, commandName, client, Discord) {


        if (args[0] == "shirt") {
            const asset = args[1]
            const noId = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Please specify the shirt asset ID!')
                .setColor(config.embed_color)
            if(!asset) return message.reply({embeds: [noId]})
            const downloadProcess = new MessageEmbed()
                .setTitle('Tempy')
                .setDescription('Currently downloading the template... <a:loading:946828008658968649>')
                .setColor(config.embed_color)
            response = await download(asset).then(res => res.text())
            newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
            res = await download(newId)
            res.body.pipe(fs.createWriteStream(`./src/Commands/assets/${newId}.png`))


            async function download(asset, headers) {
                return await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`, headers ? headers : {})
            }
            const messagee = message.reply({ embeds: [downloadProcess] }).then((sentMessage) => {
                const bypass = new MessageEmbed()
                    .setTitle('Tempy')
                    .setDescription('Bypassing roblox anti copy and paste... <a:loading:946828008658968649>')
                    .setColor(config.embed_color)

                sentMessage.edit({ embeds: [bypass] }).then(async (sentMessage) => {
                    
                    const canvas = Canvas.createCanvas(585, 559);
                    const context = canvas.getContext('2d');
                    const background = await Canvas.loadImage(path.join(__dirname, '../assets/'+ newId + '.png'));
                    const imgs = ['COOL.png', 'COOL2.png', 'COOL3.png', 'COOL4.png', 'COOL5.png']
                    const randomImgg = Math.floor(Math.random() * imgs.length);
                    const bruhCool = await Canvas.loadImage(path.join(__dirname, '../bruh/'+ imgs[randomImgg]));
                    context.drawImage(background, 0, 0, canvas.width, canvas.height);
                    context.drawImage(bruhCool, 0, 0, canvas.width, canvas.height);
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'real.png')
                    const sexyEmbed = new Discord.MessageEmbed()
                    .setTitle('Tempy')
                    .setDescription('Here you go!!!!!')
                    .setImage('attachment://real.png')
                    .setColor(config.embed_color)
                    sentMessage.edit({ embeds: [sexyEmbed], files: [attachment] })


                })

            })




        } else if(args[0] == "pants") {

            const asset = args[1]
            const noId = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Please specify the pants asset ID!')
                .setColor(config.embed_color)
            if(!asset) return message.reply({embeds: [noId]})
            const downloadProcess = new MessageEmbed()
                .setTitle('Tempy')
                .setDescription('Currently downloading the template... <a:loading:946828008658968649>')
                .setColor(config.embed_color)
            response = await download(asset).then(res => res.text())
            newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
            res = await download(newId)
            res.body.pipe(fs.createWriteStream(`./src/Commands/assets/${newId}.png`))


            async function download(asset, headers) {
                return await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`, headers ? headers : {})
            }
            const messagee = message.reply({ embeds: [downloadProcess] }).then((sentMessage) => {
                const bypass = new MessageEmbed()
                    .setTitle('Tempy')
                    .setDescription('Bypassing roblox anti copy and paste... <a:loading:946828008658968649>')
                    .setColor(config.embed_color)

                sentMessage.edit({ embeds: [bypass] }).then(async (sentMessage) => {
                    
                    const canvas = Canvas.createCanvas(585, 559);
                    const context = canvas.getContext('2d');
                    const background = await Canvas.loadImage(path.join(__dirname, '../assets/'+ newId + '.png'));
                    const imgs = ['COOL.png', 'COOL2.png', 'COOL3.png', 'COOL4.png', 'COOL5.png']
                    const randomImgg = Math.floor(Math.random() * imgs.length);
                    const bruhCool = await Canvas.loadImage(path.join(__dirname, '../bruh/'+ imgs[randomImgg]));
                    context.drawImage(background, 0, 0, canvas.width, canvas.height);
                    context.drawImage(bruhCool, 0, 0, canvas.width, canvas.height);
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'real.png')
                    const sexyEmbed = new Discord.MessageEmbed()
                    .setTitle('Tempy')
                    .setDescription('Here you go!!!!!')
                    .setImage('attachment://real.png')
                    .setColor(config.embed_color)
                    sentMessage.edit({ embeds: [sexyEmbed], files: [attachment] })


                })

            })

        } else {
            const noAssetEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Specify what you want to steal... (available: shirt, pants)')
                .setColor(config.embed_color)
            message.reply({ embeds: [noAssetEmbed] })
        }

    }
};