# osx-info [![Build Status](https://travis-ci.org/gillstrom/osx-info.svg?branch=master)](https://travis-ci.org/gillstrom/osx-info)

> Get information about your Mac


## Install

```
$ npm install --save osx-info
```


## Usage

```js
var osxInfo = require('osx-info');

osxInfo(function (err, res) {
	console.log(res);
	/*
	{
		name: 'MacBook Pro (Retina, 15-inch, Mid 2014)',
		identifier: 'MacBookPro11,3',
		core: 'Intel Core i7',
		...
	}
	*/
});
```


## CLI

```
$ npm install --global osx-info
```

```
$ osx-info --help

  Usage
    $ osx-info
```


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
