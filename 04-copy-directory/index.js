// const fs = require('fs');
const { join } = require('node:path');
const {
  access,
  readdir,
  unlink,
  mkdir,
  copyFile,
} = require('node:fs/promises');

async function copyDir() {
  await access(join(__dirname, 'files-copy'))
    .then(() => {
      console.log('Yes');
      readdir(join(__dirname, 'files-copy')).then((files) => {
        files.forEach((file) => {
          unlink(join(__dirname, 'files-copy', file));
        });
      });
    })
    .catch(() => {
      console.log('No');
      mkdir(join(__dirname, 'files-copy'), { recursive: true });
    });

  await readdir(join(__dirname, 'files')).then((files) => {
    files.forEach((file) => {
      copyFile(
        join(__dirname, 'files', file),
        join(__dirname, 'files-copy', file),
      );
    });
  });
}

// function copyDir() {
//   fs.access(join(__dirname, 'files-copy'), (error) => {
//     if (error) {
//       fs.mkdir(join(__dirname, 'files-copy'), { recursive: true }, (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//     } else {
//       fs.readdir(join(__dirname, 'files-copy'), (err, files) => {
//         if (err) {
//           console.log(err);
//         }
//         files.forEach((file) => {
//           fs.unlink(join(__dirname, 'files-copy', file), (err) => {
//             if (err) {
//               console.log(err);
//             }
//           });
//         });
//       });
//     }
//     fs.readdir(join(__dirname, 'files'), (err, files) => {
//       if (err) {
//         console.log(err);
//       }
//       files.forEach((file) => {
//         fs.copyFile(
//           join(__dirname, 'files', file),
//           join(__dirname, 'files-copy', file),
//           (err) => {
//             if (err) {
//               console.log(err);
//             }
//           },
//         );
//       });
//     });
//   });
// }

copyDir();
