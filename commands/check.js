const fs = require('fs');
const os = require('os');

module.exports = ((str, options) => {
  let todoFile = fs.readFileSync(`${os.homedir()}/.todo`).toString().split("\n");
  todoFile[str] = todoFile[str].split('');
  todoFile[str][1] = 'x';
  todoFile[str] = todoFile[str].join('');

  fs.writeFileSync(`${os.homedir()}/.todo`, todoFile.join('\n'));

});
