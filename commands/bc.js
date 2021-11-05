const { SlashCommandBuilder } = require('@discordjs/builders');
const { cmc_token } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bc')
		.setDescription('Gives the current value of bitcoin in INR'),
	async execute(interaction){
		await interaction.reply('Pong!');
	},
};


const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': cmc_token,
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});
