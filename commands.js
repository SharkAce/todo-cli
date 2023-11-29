const fs = require('fs-extra');
const os = require('os');

function getFile(env){
  const homeDir = os.homedir();
  const fileName = env.parent._optionValues.currentDir ?
     ".todo": env.parent._optionValues.file.replace('~',homeDir);
  fs.ensureFileSync(fileName);
  const fileStr = fs.readFileSync(fileName).toString();
  const fileStrSeg = fs.readFileSync(fileName).toString().split("\n");
  
  return {
    name: fileName, 
    str:  fileStr, 
    strSeg: fileStrSeg
  }
}


module.exports = {

   read: ((options, env) => {
    let todoFile = getFile(env);
    for (let i=0; i<todoFile.strSeg.length-1; i++){
      console.log(`${i} ${todoFile.strSeg[i]}`);
    }

  }),

  add: ((str, options, env) => {
    let todoFile = getFile(env);
    fs.appendFileSync(todoFile.name, `[ ] - ${str}\n`);
    
  }),

  del: ((str, options, env) => {
    let todoFile = getFile(env);
    todoFile.strSeg.splice(str,options.amount);
    if (options.all) todoFile.strSeg = [];

    fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));
  }),

  check: ((str, options, env) => {
    let todoFile = getFile(env);
    todoFile.strSeg[str] = todoFile.strSeg[str].split('');
    todoFile.strSeg[str][1] = 'x';
    todoFile.strSeg[str] = todoFile.strSeg[str].join('');

    fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));

  }),

  uncheck: ((str, options, env) => {
    let todoFile = getFile(env);
    todoFile.strSeg[str] = todoFile.strSeg[str].split('');
    todoFile.strSeg[str][1] = ' ';
    todoFile.strSeg[str] = todoFile.strSeg[str].join('');

    fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));

  })
};
