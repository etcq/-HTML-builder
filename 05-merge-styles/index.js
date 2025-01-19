const fs = require('fs');
const path = require('path');
const { readFile } = require('node:fs/promises');

const styles = [];

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: false },
  (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      if (file.slice(file.indexOf('.') + 1) === 'css') {
        readFile(path.join(__dirname, 'styles', file), { encoding: 'utf-8' })
          .then((data) => {
            styles.push(data);
          })
          .then(() => {
            fs.writeFile(
              path.join(__dirname, 'project-dist/bundle.css'),
              styles.join(' '),
              (err) => {
                if (err) {
                  console.log(err);
                }
              },
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  },
);
