//importing from discord.js and config.json
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');


//creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));//checking if the files in commands are ending with '.js'

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}//retriving command files dynamically

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));//checking if the files in events are ending with '.js'

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}//retrieving all the event files dynamically

//checking if the bot is up and running
client.on("ready", ()=>{
  console.log(`${client.user.username} is activated!!`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);