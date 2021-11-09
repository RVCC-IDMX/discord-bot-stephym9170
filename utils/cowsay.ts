import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

export default function () {
  let opts: IOptions = {
    text: 'Hello from typescript!',
    e: '^^',
    r: true,
  };

  let output: string = cowsay.say(opts);
  return `
  \`\`\`
  ${output}
  \`\`\`
  `;
}
