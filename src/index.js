#!/usr/bin/env node --harmony
const generate = require('./utils/generate').default;

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');

const { version } = require('../package.json');

program
  .version(version)

program  
  .command('generate [name]')
  .alias('g')
  .description('Generates all the files for name passed in -n')
  .option("-n, --name <name>", "What is the name of this new model")
  .action(function(cmd, options) {
    if (typeof options.name === 'string') {
      generate(options.name);
    } else {
      co(function *() {
        var name = yield prompt('Model Name: ');
        generate(name);
      });
    }
  })

program.parse(process.argv)  

// console.log("What?");


