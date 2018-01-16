var fs = require('fs');
var path = require('path');
var m = require('moment');

var cacheDirnameFile = path.join(__dirname, 'cache_data');
var cache = {};

var caches = {};

module.exports = function (req, data, count) {
	console.log(req.url, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
	if (!caches[req.url]) {
		caches[req.url] = new Cache(req.url.replace(/\//g, '|').replace(/time=\d+&?/, ''), count);
	}
	caches[req.url].add(req, data);
}

function Cache(key, max) {
	this.file = path.join(cacheDirnameFile, key + '.json')
	this.max = max || 1;
	//this.full = true;
	this.cache = { data: [], req: [] };
}

Cache.prototype.proxy = function (req, callback) {
	var self = this;
	return function (err, data) {
		if (!err && data) {
			self.add(req, data);
		}
		callback(err, data)
	}
}

Cache.prototype.add = function (req, data) {
	if (!this.full) {
		this.cache.data.push(data);
		this.cache.req.push({
			query: req.query,
			body: req.body
		})

		console.log('===============================', this.cache.data.length, this.max)
		if (this.cache.data.length >= this.max) {
			this.write();
		}
	}
}

Cache.prototype.write = function () {
	this.cache.time = m().format('YYYY-MM-DD HH:mm:ss');
	fs.writeFileSync(this.file, JSON.stringify(this.cache), 'utf8');
	this.full = true;
}
