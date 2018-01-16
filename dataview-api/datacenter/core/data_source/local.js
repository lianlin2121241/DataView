var qs     = require('querystring');
var extend = require('../extends');
var Base   = require('../base');

extend(Local, Base);

function Local() {
  Local.__super__.constructor.apply(this, arguments);
  this.api = this.config.data.api;
  this.query = this.config.query;
}

Local.prototype.get = function (query, callback) {
  var query = qs.stringify(query);
  var api = this.api.split('?');
  if (api[1]) {
    api[1] += '&' + query;
  } else {
    api[1] = query;
  }
  api = api.join('?');
  callback({redirect: api});
}

module.exports = Local;
