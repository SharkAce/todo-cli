const fs = require('fs');
const os = require('os');

module.exports = ((str, options) => {
  let todoFile = fs.readFileSync(`${os.homedir()}/.todo`).toString().split("\n");
  todoFile.splice(todoFile.length-1, 0, `[ ] - ${str}`)

  fs.writeFileSync(`${os.homedir()}/.todo`, todoFile.join('\n'));

  
});
