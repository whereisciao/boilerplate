var winston = require('winston');

module.exports = {
  'foursquare' : {
    'accessTokenUrl' : 'https://foursquare.com/oauth2/access_token',
    'authenticateUrl' : 'https://foursquare.com/oauth2/authenticate',
    'apiUrl' : 'https://api.foursquare.com/v2'
  },
  'google': {},
  'twitter': {},
  'github' : {},
  'linkedin' : {},
  'winston' : {
    'transports' : [
      new (winston.transports.Console)({
        'level' : 'warn',
        'colorize' : true
      })
    ],
    'levels': {
      'detail': 0,
      'trace': 1,
      'debug': 2,
      'enter': 3,
      'info': 4,
      'warn': 5,
      'error': 6
    },
    'colors': {
      'detail': 'grey',
      'trace': 'white',
      'debug': 'blue',
      'enter': 'inverse',
      'info': 'green',
      'warn': 'yellow',
      'error': 'red'
    },
    // Overrides for specific loggers
    'loggers': {
      'default': {
        'console': {
          'level': 'trace'
        }
      }
    }
  },
  'secrets' : {
    'foursquare': {},
    'google': {},
    'twitter': {},
    'github' : {},
    'linkedin' : {}
  }
};