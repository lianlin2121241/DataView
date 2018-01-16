var extend = require('../extends');
var Base = require('../base');
var urllib = require('urllib');
var path = require('path');

extend(Static, Base);

function Static() {
  Static.__super__.constructor.apply(this, arguments);
}

Static.prototype.get = function*(query) {
  return this.applyFilters(this.data.data, query);
}

module.exports = Static;
