const api = require('discord.js');
const api_key = api.api_key;
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: '',
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send('Please enter a City');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=imperial&appid=${api_key}`;

    let response, city;

    try {
      response = await axios.get(url);
      city = response.data;
      console.log(city);
    } catch (e) {
      return message.channel.send('Could not find that city');
    }

    const embed = new MessageEmbed()
      .setTitle(city.name)
      .setThumbnail(
        `http://openweatherapp.org/img/wn/${city.weather[0].icon}@2x.png`
      )
      .setDescription(city.weather[0].description);
      .addFields(
        fields:{
              name: 'Current Temperature'
              value: `${city.main.temp} °F`
         },
      )

  }
    await message.channel.send(embed);
