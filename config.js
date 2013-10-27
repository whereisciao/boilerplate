var winston = require('winston')
  , nconf = require('nconf');

nconf.argv().env().file({ file: './config.json' });

// Set up winston
nconf.set('winston:transports', [
  new (winston.transports.Console)({
    'level' : 'warn',
    'colorize' : true
  })
]);

var config = nconf.get();
winston.addColors(config.winston.colors);
nconf.set('logger', new (winston.Logger)().setLevels(config.winston.levels));
config = nconf.get();

module.exports = config;
