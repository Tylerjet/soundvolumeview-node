#!/usr/bin/env node
'use strict';
var meow = require('meow');
var soundvolumeview = require('./');

var cli = meow({
	help: [
	]
});

if (!cli.input.length) {
	console.error('Input is required');
	process.exit(1);
}

soundvolumeview(cli.input).then(console.log);
