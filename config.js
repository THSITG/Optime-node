var yaml = require('js-yaml');
var nconf = require('nconf');
var fs = require('fs');

var defaultConfig = {
  "database": {
    "host": "localhost",
    "name": "optime"
  },
  "port": 80
}

nconf.file({
  file: "./config/optime.yml",
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump
  }
});

nconf.defaults(defaultConfig);

module.exports = nconf;

