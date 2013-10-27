var passport = require('passport')
  , core = require('./../core')()
  , config = core.getConfig().auth
  , logger = core.getLogger('auth');

console.log(config);

function addFacebookAuth(app) {
  var FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(
    new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        // TODO: do something with the data.
      })
  );

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
    passport.authenticate(
      'facebook',
      { successRedirect: '/', failureRedirect: '/login' }
    )
  );
}

function addTwitterAuth(app) {
  var TwitterStrategy = require('passport-twitter').Strategy;

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      // TODO: do something with the data.
    })
  );

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/twitter/callback',
    passport.authenticate(
      'twitter',
      { successRedirect: '/', failureRedirect: '/login' }
    )
  );
}

function addGoogleAuth(app) {
  var GoogleStrategy = require('passport-google').Strategy;

  passport.use(new GoogleStrategy({
      returnURL: config.google.returnURL,
      realm: config.google.realm,
    },
    function(identifier, profile, done) {
      // TODO: do something with the data.
    })
  );

  // Redirect the user to Google for authentication.  When complete, Google
  // will redirect the user back to the application at
  //     /auth/google/return
  app.get('/auth/google', passport.authenticate('google'));

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/return',
    passport.authenticate(
      'google',
      { successRedirect: '/', failureRedirect: '/login' }
    )
  );
}

function addGithubAuth(app) {
  var GithubStrategy = require('passport-github').Strategy;

  passport.use(new GithubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      // TODO: do something with the data.
    })
  );
}

function addAll(app) {
  addFacebookAuth(app);
  addGithubAuth(app);
  addGoogleAuth(app);
  addTwitterAuth(app);
}

module.exports = {
  'addAll': addAll,
  'addFacebookAuth' : addFacebookAuth,
  'addGithubAuth' : addGithubAuth,
  'addGoogleAuth' : addGoogleAuth,
  'addTwitterAuth' : addTwitterAuth
};
