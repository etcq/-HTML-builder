const fs = require('fs');
const { join } = require('node:path');

function copyDir() {
  fs.access(join(__dirname, 'files-copy'), fs.constants.F_OK).then(
    fs.rm(join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    }),
  );

  fs.mkdir(join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.readdir(join(__dirname, 'files'), (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      fs.copyFile(
        join(__dirname, 'files', file),
        join(__dirname, 'files-copy', file),
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
  });
}

copyDir();
