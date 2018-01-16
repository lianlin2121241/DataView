var ready = require('ready');
var mysql = require('mysql');

function Mysql(config){
  var self = this;
  this.api = config.name;
  this.conn = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.auth.user,
    password: config.auth.pass,
    database: config.extra.database,
    multipleStatements: true,
    supportBigNumbers: true,
    connectTimeout: 30000,
  });

  this.connectCount = 0;

  this.conn.config.connectionConfig.queryFormat = function (query, values) {
    if (!values) return query;
    var sql = query.replace(/\:(\w+)/g, function (txt, key) {
      if ( Object.prototype.hasOwnProperty.call(values, key) ) {
        var value = values[key];
        if (value && typeof value.match == 'function' && value.match(/^\d+(\.\d+)?$/)) {
          value *= 1;
        }
        return this.escape(value);
      }
      return txt;
    }.bind(this));
    console.log(sql)
    return sql;
  };

  ready(this);
  this.ready(true);
}

Mysql.prototype.query = function (sql, values) {
  var self = this;
  return function(cb){
    self.ready(function(){
      if (typeof values === 'function') {
        cb = values;
        values = null;
      }
      self.conn.query({sql:sql, timeout:30000}, values, function (err, rows) {
        err && console.log(sql, values, err)
        cb && cb(err&&err.code, rows);
      });
    });
  }
};

Mysql.prototype.end = function(){
  this.conn.end();
};

module.exports = Mysql
