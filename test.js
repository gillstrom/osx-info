'use strict';
var test = require('ava');
var osxInfo = require('./');

test('info', function (t) {
	t.plan(2);

	osxInfo(function (err, res) {
		t.assert(!err, err);
		t.assert(typeof res === 'object', res);
	});
});
