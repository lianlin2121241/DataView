var extend = require('../../extends');
var Base   = require('../../base');

extend(Storage, Base);

var drivers = {
  'mysql': require('./mysql'),
  'rds': require('./mysql'),
  'ads': require('./mysql')
};

var pool = {};
var storages = {};
var last_update = 0;

function Storage(config) {
  Storage.__super__.constructor.apply(this, arguments);
  var storage = config.config.storage
  if (!pool[storage.name]) {
    if(drivers[storage.type]) {
      pool[storage.name] = new drivers[storage.type](storage);
    } else {
      console.error('unsupport', storage.type);
      throw 'unsupport', storage.type;
    }
  }
  this.sql = config.config.sql;
  this.storage = pool[storage.name];
}

Storage.prototype.get = function *(query, callback) {
  var data = yield this.query(this.sql, query, callback);
  return this.applyFilters(data, query);
}

Storage.prototype.query = function *(sql, data, callback) {
  return yield this.storage.query(sql, data, callback);
}

module.exports = Storage;
