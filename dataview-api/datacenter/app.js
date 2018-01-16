'use strict';

var graceful = require('graceful');
var config = require('./config');

var express = require('express');
var ms = require('humanize-ms');
var co = require('co');
var urllib = require('urllib');
var path = require('path');

var DataCenter = require('./core');

var fs = require('fs');
var path = require('path');

/**
 * setting up app
 */
var app = express();
app.set('x-powered-by', false);

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
	if(req.method=="OPTIONS"){
		res.send(200);
	}else{
		return next();
	}
});
/**
 * Error handler
 */
app.use(function (err, req, res, next) {
	switch (err.code) {
		case 'EBADCSRFTOKEN':
			console.error('csrftoken_error', userNick, req.url);
			res.status(403).send('forbidden');
			break;
		default:
			res.status(500).send('Server Error, Please try later!');
	}
});

app.get('/status', function (req, res) {
	res.end('success')
});

app.get('/:api', api(function* (req, res) {
	try {
		var dataCache = require('./dataConfig');
		return yield DataCenter.get(req.params.api, dataCache[req.params.api], req.query);
	} catch (e) {
		console.log('=============================', req.params)
		console.log(e);
		console.log(e.stack);
		throw "系统错误";
	}
}));

/**
 * Page not found handler
 */
app.use(function (req, res) {
	res.status(404).end('Not Found');
});

var serv = app.listen(config.port, config.bindingHost);

console.log('[%s] [worker:%d] Server started, listen at %s:%d, cluster: %s',
	new Date(), process.pid,
	config.bindingHost || '127.0.0.1',
	config.port,
	config.enableCluster);

graceful({
	server: app,
	error: function (err, throwErrorCount) {
		if (err.message) {
			err.message += ' (uncaughtException throw ' + throwErrorCount + ' times on pid:' + process.pid + ')';
		}
		console.error(err);
	}
});

//require('./websocket')(serv);
module.exports = app;

function api(func) {
	return function (req, res) {
		var allowOrigin = "";

		if (req.headers.origin && req.headers.origin.match(/(?:127\.0\.0\.1|localhost|datav.aliyun.com)(?::\d+)?$/)) {
			allowOrigin = req.headers.origin;
		}

		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', '192.168.117.38');

		co(function* () {
			var data = yield func(req, res);
			if (typeof data != 'string')
				data = JSON.stringify(data);
			res.end(data);
		}).catch(function (err) {
			if (err.redirect) {
				res.redirect(302, err.redirect);
			} else if (err == 401) {
				res.status(401).end('Unauthorized');
			} else if (err == 404) {
				res.status(404).end('Not Found');
			} else if (typeof err == 'string') {
				console.log(err)
				var data = {
					isError: true,
					message: err
				}
				res.end(JSON.stringify(data));
			} else {
				console.error(err.stack)
				res.status(500).end(err.message || 'Server Error');
			}
		});
	}
}
