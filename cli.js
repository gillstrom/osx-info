#!/usr/bin/env node
'use strict';
const leftPad = require('left-pad');
const meow = require('meow');
const osxInfo = require('./');

const cli = meow(`
	Usage
	  $ osx-info

	Options
	  --json  Output the result as JSON
`);

osxInfo().then(data => {
	if (cli.flags.json) {
		console.log(JSON.stringify(data));
		process.exit(0);
	}

	Object.keys(data).forEach(x => {
		console.log(`${leftPad(x, 12)}: ${data[x]}`);
	});
});
