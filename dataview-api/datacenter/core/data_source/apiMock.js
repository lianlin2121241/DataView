var extend = require('../extends');
var Base   = require('../base');
var urllib = require('urllib');
var config = require('../../config');
var url    = require('url');
var qs     = require('query-string-object');
var _      = require('lodash');

extend(ApiMock, Base);

function ApiMock() {
  ApiMock.__super__.constructor.apply(this, arguments);
  this.mockParams=this.config.config.dataParams;
  // if (!this.config.local) {
  //   this.query = this.config.query;
  //   this.api = this.data.api || '';
  //   if(this.api.search('/') === 0) {
  //     throw "url must contains protocol field, like http:"
  //   }
  // }
}

ApiMock.prototype.get = function*(query, callback ) {
  if (!this.mockParams) return [];

  var self = this;
  var _url = config.mockUrl;
  // var _query = qs.stringify(_.merge(qs(_url.query), query));

  // if (!_url.protocol) {
  //   throw "url must contains protocol field, like http:"
  // }
  // _url = _url.protocol + '//' + _url.host + _url.pathname;
  // if (_query) {
  //   _url += "?" + _query;
  // }
  try {
    var data = yield urllib.request(_url, {
      type: 'post',
      timeout: 3000,
      dataType: 'json',
      contentType: 'json',
      data: {
        mockParams:this.mockParams
      }
    }, callback);
    return this.applyFilters(data.data.data.returnData, query);
  } catch(e) {
    throw e.code;
  }
}

module.exports = ApiMock;
