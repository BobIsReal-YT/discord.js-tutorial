const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientID, guildID } = require('./configuration.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing...');

		await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{ body: commands },
		);

		console.log('Finished!');
	} catch (error) {
		console.error(error);
	}
})();
