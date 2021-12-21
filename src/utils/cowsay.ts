import cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

export default function (cow: string = 'random') {
  const idx = getRandomInt(0, quotes.length);
  const quoteOBJ = quotes[idx];
  const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

  let opts: IOptions = {
    text: 'Hello from typescript!',
    e: '^^',
    r: true,
    //f:'radio',
  };

  if (cow !== 'random') {
    opts.r = false;
    opts.f = cow;
  }
  let output;
  try {
    output = cowsay.say(opts);
  } catch {
    output = 'That cow does not exist';
  }
  if (output.length > 2000) {
    output = 'Darn all the cows in the barn are sleeping';
  }
  return `\`\`\`\n${output.replace(/```/g, "``'")}\n\`\`\``;
}
