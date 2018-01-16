"use strict"

var Request = require('./request');
var dataSource = require('./data_source');
var util = require('./util');

function DataCenter (config) {
}

DataCenter.prototype.get = function * (api, ds, query) {
/*
  try {
    ds.config.storage.auth = JSON.parse(util.aesDecrypt(ds.config.storage.auth));
  } catch(e) {}
*/
  return yield dataSource.get(ds, query);
}

DataCenter.prototype.processConfig = function (config) {
  for (var name in config) {
    var api = config[name];
    dataSource.add(name, api);
  }
}


module.exports = new DataCenter();
