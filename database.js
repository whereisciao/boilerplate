var core = require('./core')()
  , logger = core.getLogger('main')
  , mongoose = require('mongoose');

function connect(config) {
  // Connect Database

  var mongoURL = process.env.MONGO_URL;

  if(!mongoURL){
    throw new Error('No database url; Please assign a MongoDB URL at ENV[\'MONGO_URL\'].');
  }

  logger.info('Connecting to MongoDB at ' + mongoURL);
  mongoose.connect(mongoURL);
};

function disconnect() {
  logger.info('Disconnecting MongoDB');
  mongoose.connection.close();
};

module.exports = exports = {
  connect: connect,
  disconnect: disconnect
};