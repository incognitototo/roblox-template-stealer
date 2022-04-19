module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`${client.user.username} is ready to go!`);
        client.user.setActivity('tempy!help', {type: 'WATCHING'});
    }
};