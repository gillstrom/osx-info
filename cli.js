#!/usr/bin/env node
'use strict';
var meow = require('meow');
var osxInfo = require('./');

var cli = meow({
	help: [
		'Usage',
		' $ osx-info'
	].join('\n')
});

osxInfo(function (err, res) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(res);
});
