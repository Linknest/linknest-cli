#!/usr/bin/env node

const rp = require('request-promise');
const carrier = require("carrier");
const clear = require("cli-clear");
const log = console.log;
const chalk = require('chalk');
let collection = [];

clear();

log(chalk.yellow('Enter collection (user/collection): '));

process.stdin.resume();

carrier.carry(process.stdin, function(line) {

  collection.title = String(line).split('/')[1];
  collection.url = `https://linknest.com/${line}`;

  var options = {
      uri: collection.url+'/json/',
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true
  };

  rp(options)
  .then(function (collectionLinks) {

    log(chalk.magenta.bold('\nCollection %s has %d links'), collection.title, collectionLinks.length);
    log(chalk.magenta.bold(collection.url+'\n'));

    Object.keys(collectionLinks).forEach(function(key) {
      log(chalk.green(collectionLinks[key].title));
      log(chalk.cyan(collectionLinks[key].linkurl));
    });

    process.exit();

  })

});
