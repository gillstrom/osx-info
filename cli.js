#!/usr/bin/env node
'use strict';
const meow = require('meow');
const osxInfo = require('./');

meow(`
	Usage
	  $ osx-info
`);

osxInfo().then(data => console.log(data));
