const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

const textFile = path.resolve(__dirname, 'text.txt');

fs.writeFile(textFile, '', (err) => {
  if (err) {
    throw err;
  }
  stdout.write('Input a text, please\n');
  stdin.on('data', (data) => {
    const strData = data.toString();
    console.log(strData);
    fs.appendFile(textFile, strData, (err) => {
      if (err) {
        throw err;
      }
      stdout.write('File was updated\n');
    });
    process.on('SIGINT', () => {
      console.log('\nGoodbye, my dear');
      process.exit();
    });
  });
});
