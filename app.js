
var core = require('./core')()
  , express = require('express')
  , http = require('http')
  , nib = require('nib')
  , path = require('path')
  , routes = require('./routes')
  , stylus = require('stylus')
  , user = require('./routes/user');

var app = express()
  , logger = core.getLogger('main')
  , public_dir = path.join(__dirname, 'public');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

// all environments
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  express.favicon(),
  express.bodyParser(),
  express.methodOverride(),
  express.cookieParser('m0v3f@st'),
  express.session(),
  app.router,
  stylus.middleware({
    'src': public_dir,
    'compile': compile
  }),
  express.static(public_dir)
);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
