const fs = require('fs');
const os = require('os');

module.exports = ((str, options) => {
  let todoFile = fs.readFileSync(`${os.homedir()}/.todo`).toString().split("\n");
  for (let i=0; i<todoFile.length-1; i++){
    console.log(`${i} ${todoFile[i]}`)
  }

});
