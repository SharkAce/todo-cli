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

function validEntry(entryNum, env){
  const isValid = parseInt(entryNum) && entryNum < getFile(env).strSeg.length;
  if (!isValid) console.error(`${entryNum} is not a valid entry`);
  return isValid;
}


module.exports = {

   read: ((options, env) => {
    let todoFile = getFile(env);
    const lineAmnt = todoFile.strSeg.length-1;
    for (let i=0; i<lineAmnt; i++){
      let offset = lineAmnt.toString().length - (i+1).toString().length;
      console.log(`(${i+1}) ${Array(offset+1).join(' ')}${todoFile.strSeg[i]}`);
    }

  }),

  add: ((arr, options, env) => {
    let todoFile = getFile(env);
    arr.forEach((str) => {
      fs.appendFileSync(todoFile.name, `[ ] - ${str}\n`);
    });
    
  }),

  del: ((int, options, env) => {
    let todoFile = getFile(env);
    todoFile.strSeg.splice(int-1,options.amount);
    if (options.all) todoFile.strSeg = [];

    fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));
  }),

  check: ((arr, options, env) => {
		let todoFile = getFile(env);
		arr.forEach((int) => {

			if (validEntry(int, env)){
				int --;

				todoFile.strSeg[int] = todoFile.strSeg[int].split('');
				todoFile.strSeg[int][1] = options.symbol;
				todoFile.strSeg[int] = todoFile.strSeg[int].join('');

				fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));
			}
		});

  }),

  uncheck: ((arr, options, env) => {
		let todoFile = getFile(env);
		arr.forEach((int) => {

			if (validEntry(int, env)){
				int --;

				todoFile.strSeg[int] = todoFile.strSeg[int].split('');
				todoFile.strSeg[int][1] = ' ';
				todoFile.strSeg[int] = todoFile.strSeg[int].join('');

				fs.writeFileSync(todoFile.name, todoFile.strSeg.join('\n'));
			}
		})
	})
}
