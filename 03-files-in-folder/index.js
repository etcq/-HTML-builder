const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const extname = path.extname(file.name).slice(1);
      const name = file.name.slice(0, file.name.indexOf('.'));
      // let size = '';
      if (!file.isDirectory()) {
        fs.stat(path.join(file.path, file.name), (err, stats) => {
          if (err) {
            console.log(err);
          }
          console.log(
            `${name} - ${extname} - ${(stats.size / 1000).toFixed(3)}kB`,
          );
        });
      }
    });
  },
);
