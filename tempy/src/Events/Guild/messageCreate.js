const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../../config.json');
const { Permissions } = require('discord.js');

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (message.content == "lego") return message.reply("gta");
        if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return;
        const prefix = config.prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

       


        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        };

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const timeLeftEmbed = new MessageEmbed()
                    .setColor(config.embed_color)
                    .setTitle('Error!')
                    .setDescription(`You are using the commands too fast. Please try again in \`${timeLeft.toFixed(1)} seconds\`.`)
                    
                return message.reply({ embeds: [timeLeftEmbed] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 10000);
                    });
            };
        };

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                const noPermissionsEmbed = new MessageEmbed()
                    .setTitle('Error!')
                    .setDescription(`Looks like you have insufficient permissions to run this command.`)
                    .addField('Needed permissions', `\`${command.permissions}\``)
                    .setColor(config.embed_color)
                    
                message.reply({ embeds: [noPermissionsEmbed] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 60000)
                    })
            } else {

                try {
                    command.execute(message, args, commandName, client, Discord);
                } catch (error) {
                    console.log(err);
                    const ErrorEmbed = new MessageEmbed
                        .setTitle('Error!')
                        .setColor(config.embed_color)
                        .setDescription(`Oh oh! Looks like an error occurred.`)
                        .addField('Error Message', `${error}`)
                      
                    message.reply({ embeds: [ErrorEmbed] })
                };
            }
        };


    }
};