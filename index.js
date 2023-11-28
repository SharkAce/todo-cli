#!/usr/bin/env node

import cli from "commander";

cli.description("Create and maintain a todo list");
cli.name("todo");

cli.parse(process.argv);
