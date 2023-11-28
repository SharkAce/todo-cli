#!/usr/bin/env node

const { Command } = require('commander');
const cli = new Command();

const read = require('./commands/read.js');
const check = require('./commands/check.js');
const uncheck = require('./commands/uncheck.js');
const add = require('./commands/add.js');

if (process.argv.length === 2) {
  process.argv.push('read')
}

cli.description("Create and maintain a todo list");
cli.name("todo");

cli.command("read")
  .description("Print content of ~/.todo")
  .action(read);

cli.command("check")
  .description("Check a specified entry")
  .argument("<string>", "Entry to check")
  .action(check);

cli.command("uncheck")
  .description("Uncheck a specified entry")
  .argument("<string>", "Entry to uncheck")
  .action(uncheck);

cli.command("add")
  .description("Create a new entry")
  .argument("<string>", "Entry text")
  .action(add);

cli.parse(process.argv);
