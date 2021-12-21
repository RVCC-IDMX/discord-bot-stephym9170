import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

const PREFIX = process.env.PREFIX || '#sm';

const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(PREFIX)) return;
  if (!channels.includes(message.channel.id)) return;
  const args = message.content
    .toLowerCase()
    .substring(PREFIX.length)
    .slice()
    .trim()
    .split(/\s+/);
  const command = args.shift();

  if (command === 'ping') {
    message
      .react('⏲️')
      .then(() => console.log(`Reacted to message "${command}"`))
      .catch(console.error);

    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Reacted to message "${command}"`))
      .catch(console.error);
  }
  if (command === 'cowsay') {
    message
      .react('🐄')
      .then(() => console.log(`Reacted to message "${command}"`))
      .catch(console.error);
  }
  const output = cowsay(args[0]);
  message
    .reply(output)
    .then(() => console.log(`Replied to message "${command}"`))
    .catch((error) => {
      if (error.code === 50035) {
        message.reply({
          content: 'Large',
        });
      }
    });
});

client.login(process.env.TOKEN);
