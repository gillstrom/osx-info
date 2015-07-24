#!/usr/bin/env node
'use strict';
var meow = require('meow');
var osxInfo = require('./');

meow({
	help: [
		'Usage',
		'  $ osx-info'
	]
});

osxInfo(function (err, res) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(res);
});
