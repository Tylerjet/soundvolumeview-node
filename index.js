'use strict';
var spawn = require('child_process').spawn;
var path = require('path');
var multiTypeof = require('multi-typeof');
var packageList = require(require.main.path + "\\package.json").dependencies;

function checkInput(input) {
	if (!multiTypeof(input, ['string', 'array'])) {
		throw new TypeError('Expected a string or an array as input');
	}

	if (!Array.isArray(input)) {
		var reg = new RegExp(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
		input = input.match(reg);

		input.forEach(function (el) {
			input[input.indexOf(el)] = el.replace(/"/g, '');
		});
	}

	return input;
}

module.exports = function (input, opts) {
	opts = opts || {};

	if (process.platform !== 'win32') {
		throw new Error('Only Windows systems are supported');
	}

	if (packageList.hasOwnProperty('pkg')) {
		__dirname = process.cwd()
	}

	return spawn(path.join(__dirname, 'SoundVolumeView.exe'), checkInput(input), opts).on('error',(err)=>{
		console.log(err)
	})
}