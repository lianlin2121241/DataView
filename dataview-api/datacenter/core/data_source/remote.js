var extend = require('../extends');
var Base   = require('../base');
var urllib = require('urllib');
var config = require('../../config');
var url    = require('url');
var qs     = require('query-string-object');
var _      = require('lodash');

extend(Remote, Base);

function Remote() {
  Remote.__super__.constructor.apply(this, arguments);
  if (!this.config.local) {
    this.query = this.config.query;
    this.api = this.data.api || '';
    if(this.api.search('/') === 0) {
      throw "url must contains protocol field, like http:"
    }
  }
}

Remote.prototype.get = function*(query, callback ) {
  if (!this.api) return [];

  var self = this;
  var _url = url.parse(this.api);
  var _query = qs.stringify(_.merge(qs(_url.query), query));

  if (!_url.protocol) {
    throw "url must contains protocol field, like http:"
  }
  _url = _url.protocol + '//' + _url.host + _url.pathname;
  if (_query) {
    _url += "?" + _query;
  }
  try {
    var data = yield urllib.request(_url, {
      timeout: 3000,
      dataType: 'json'
    }, callback);
    return this.applyFilters(data.data, query);
  } catch(e) {
    throw e.code;
  }
}

module.exports = Remote;
