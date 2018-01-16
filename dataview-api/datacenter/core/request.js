var dataSource = require('./data_source');

function Request(res) {
  this.res = res;
}

//TODO 结构暂时保留，考虑性能后再做调整
Request.prototype.get = function * (api, query) {
  return yield dataSource.get(api, query);
}

module.exports = Request;
