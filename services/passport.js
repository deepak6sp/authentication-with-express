import passport from 'passport';
import config from '../jwt';
import User from '../models/users';
import LocalStrategy from 'passport-local';

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorize');
opts.secretOrKey = config.secret;

passport.use(new LocalStrategy({usernameField : 'email'}, function(email, password, done) {
    console.log('email');
    console.log(email);
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      user.comparePassword(password, function(err, isMatch){
        if(err) { return done(null, false); }
        return done(null, user);
      });
    });
}));

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
