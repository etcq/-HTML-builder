const fs = require('fs');
const path = require('path');
const { stdout: output, stdin: input } = process;
const readline = require('readline');

const textFile = path.resolve(__dirname, 'text.txt');

let rl = readline.createInterface(input, output);

fs.writeFile(textFile, '', (err) => {
  if (err) {
    throw err;
  }
  rl.setPrompt('Input text, please\n');
  rl.prompt();
  rl.on('line', (text) => {
    rl.resume();
    const currText = `${text} `;
    if (text === 'exit') {
      rl.close();
    } else {
      fs.appendFile(textFile, currText, (error) => {
        if (error) {
          throw error;
        }
      });
    }
  });
  process.on('exit', () => {
    console.log('\nGood Bye!');
  });
  process.on('SIGINT', () => {
    process.exit();
  });
});
