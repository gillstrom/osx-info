'use strict';
var test = require('ava');
var osxInfo = require('./');

test(function (t) {
	t.plan(1);

	osxInfo().then(function (data) {
		t.assert(typeof data === 'object', data);
	});
});
