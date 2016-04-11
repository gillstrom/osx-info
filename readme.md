# osx-info [![Build Status](https://travis-ci.org/gillstrom/osx-info.svg?branch=master)](https://travis-ci.org/gillstrom/osx-info)

> Get information about your Mac


## Install

```
$ npm install --save osx-info
```


## Usage

```js
const osxInfo = require('osx-info');

osxInfo().then(data => {
	console.log(data);
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


## Related

* [osx-model](https://github.com/kevva/osx-model) - Get your Mac model


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
