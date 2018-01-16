function Static(config) {
  this.config = config;
  this.data = config.config;
  this.filters = config.filters;
}

Static.prototype.applyFilters = function(data, query) {
  for (var i in this.filters) {

    console.log("==========================================>filters====="+this.filters[i]);

    data = this.filters[i](data, query);
  }
  return data;
}

Static.prototype.get = function(query, callback ) {
  var data = this.applyFilters(this.data, query);
  callback(null, data);
}

module.exports = Static;
