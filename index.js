'use strict';
var execFile = require('child_process').execFile;
var got = require('got');
var parseXml = require('xml2js').parseString;

module.exports = function (cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	var cmd = 'system_profiler';
	var args = [
		'SPHardwareDataType'
	];

	execFile(cmd, args, function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		var arr = res.trim().split('\n');
		arr = arr.splice(4, arr.length - 1);

		var obj = {};
		var keys = {
			'Model Name': 'name',
			'Model Identifier': 'identifier',
			'Processor Name': 'core',
			'Processor Speed': 'speed',
			'Number of Processors': 'cpus',
			'Total Number of Cores': 'cores',
			'L2 Cache (per Core)': 'l2',
			'L3 Cache': 'l3',
			'Memory': 'memory',
			'Boot ROM Version': 'rom',
			'SMC Version (system)': 'smc',
			'Serial Number (system)': 'sn',
			'Hardware UUID': 'uuid'
		};

		Object.keys(arr).forEach(function (key) {
			var s = arr[key].split(':');
			obj[keys[s[0].trim()] || s[0].trim()] = s[1].trim();
		});

		var url = 'http://support-sp.apple.com/sp/product?cc=' + obj.sn.substring(obj.sn.length - 4, obj.sn.length);

		got(url, function (err, res) {
			if (err) {
				cb(err);
				return;
			}

			parseXml(res, function (err, res) {
				if (err) {
					cb(err);
					return;
				}

				if (res.root.hasOwnProperty('configCode')) {
					obj.name = res.root.configCode[0];
				}

				cb(null, obj);
			});
		});
	});
};
