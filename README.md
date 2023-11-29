Simple cli application to create and manage todo lists

### Instalation
```
$ git clone https://github.com/sharkace/todo-cli.git
$ cd todo-cli
$ npm i
// To create a link in /usr/bin:
# npm i -g
```

### Usage
```
todo [options] [command]

Options:
  -f, --file <string>  Specify a todo file (default: "~/.todo")
  -c, --current-dir    Use the current directory
  -h, --help           display help for command

Commands:
  read                 Print content of todo file
  check <int>          Check a specified entry
  uncheck <int>        Uncheck a specified entry
  add <string>         Create a new entry
  del [options] [int]  Remove entries
  help [command]       display help for command
```
