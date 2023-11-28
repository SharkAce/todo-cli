#!/usr/bin/env node

const { Command } = require('commander');
const cli = new Command();

cli.description("Create and maintain a todo list");
cli.name("todo");

cli.parse(process.argv);
