'use strict';
const execa = require('execa');
const got = require('got');
const parseXml = require('xml2js').parseString;
const pify = require('pify');

module.exports = function () {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	let arr;

	return execa('system_profiler', ['SPHardwareDataType']).then(res => {
		arr = res.stdout.trim().split('\n');
		arr = arr.splice(4, arr.length - 1);

		const obj = {};
		const keys = {
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

		Object.keys(arr).forEach(x => {
			const s = arr[x].split(':');
			obj[keys[s[0].trim()] || s[0].trim()] = s[1].trim();
		});

		return got(`http://support-sp.apple.com/sp/product?cc=${obj.sn.substring(obj.sn.length - 4, obj.sn.length)}`)
			.then(res => pify(parseXml, Promise)(res.body))
			.then(data => {
				if (data.root.configCode) {
					obj.name = data.root.configCode[0];
				}

				return obj;
			});
	});
};
