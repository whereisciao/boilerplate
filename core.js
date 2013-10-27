var winston = require('winston')
  , config = require('./config')
  , logger = config.logger;

/**
 * Construct the Core module.
 */
module.exports = function() {

  function getLoggerSettings(name) {
    var settings = config.winston.loggers[name] || config.winston.loggers.default;

    if(!settings) {
      logger.error('No settings exist for \'' + name + '\', nor is there a default. Update your configuration.');
      settings = config.winston.loggers['default'] = {
        'console': {
          'level': 'warn'
        }
      }
    }

    for(var setting in settings) {
      settings[setting]['label'] = name;
      settings[setting]['colorize'] = true;
    }

    return settings;
  }

  function getLogger(name) {
    if(!winston.loggers.has(name)) {
      var logger = winston.loggers.add(name, getLoggerSettings(name));
      logger.setLevels(config.winston.levels);
    }
    return winston.loggers.get(name);
  }

  function getConfig() {
    return config;
  }

  return {
    'getConfig' : getConfig,
    'getLogger' : getLogger,
    'getLoggerSettings' : getLoggerSettings
  }
};
