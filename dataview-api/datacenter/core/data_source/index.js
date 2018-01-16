/*!
 * maliang-web: sdksource/core/data_center/data_source/index.js
 * Authors  : 剪巽 <jianxun.zxl@taobao.com> (https://github.com/fishbar)
 * Create   : 2015-07-26 13:21:35
 * CopyRight 2015 (c) Alibaba Group
 */
var fs = require('fs');

var drivers = {
  'static'  : require('./static'),
  'api'     : require('./remote'),
  'apiMock' : require('./apiMock'),
  'database' : require('./storage'),
  'csv'     : require('./csv'),
};

function DataFactory() {
  this.sources = {};
}

DataFactory.prototype.get = function * (config, query) {
  if (!drivers[config.type]) {
    throw 'Wrong API Type: '+ JSON.stringify(config)
  }
  var Driver = drivers[config.type];
  var model = new Driver(config);
  return yield model.get(query);
};

module.exports = new DataFactory();
