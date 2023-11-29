#!/usr/bin/env node

const { Command } = require('commander');
const cli = new Command();

const commands = require('./commands.js');

cli.description("Create and maintain a todo list");
cli.name("todo");
cli.option("-f, --file <string>", "Specify a todo file", "~/.todo");
cli.option("-c, --current-dir", "Use the current directory");

cli.command("read", {isDefault: true})
  .description("Print content of todo file")
  .action(commands.read);

cli.command("check")
  .description("Check a specified entry")
  .argument("<int>", "Entry to check")
  .action(commands.check);

cli.command("uncheck")
  .description("Uncheck a specified entry")
  .argument("<int>", "Entry to uncheck")
  .action(commands.uncheck);

cli.command("add")
  .description("Create a new entry")
  .argument("<string>", "Entry text")
  .action(commands.add);

cli.command("del")
  .description("Remove entries")
  .argument("[int]", "Entry to delete", 0)
  .option("-n --amount <int>", "Number of entries to delete", 1)
  .option("-a --all", "Delete all entries")
  .action(commands.del);

cli.parse(process.argv);
