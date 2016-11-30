module.exports = function() {
  let config = {};

  config.toCamelCase = function(str) {
    return str
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }

  config.toPascalCase = function(str) {
    return str
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
  }

  config.toKebabCase = function(str) {
    return str
      .replace(/\s/g, '-')
      .toLowerCase();
  }

  config.toLowerCase = function(str) {
    return str.toLowerCase();
  }

  config.toCapitalCase = function(str) {
    return str
      .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
  }

  config.toAttachedCase = function(str) {
    return str
      .replace(/\s/g, '')
      .toLowerCase();
  }

  return config;
}
