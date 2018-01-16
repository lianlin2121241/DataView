var extend = require('../extends');
var Base = require('../base');

extend(CSV, Base);

function CSV() {
  CSV.__super__.constructor.apply(this, arguments);
}

CSV.prototype.get = function*(query) {
  return this.data.data;
}
module.exports = CSV;
