require("dotenv").config();

const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const db = require("../models");
const { User } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY || 'verystrongsecretpassword'
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id } });
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);

//Crate db user login from social
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "405179135262-nrr7s0ugiirnjb3i09b691qua28lvksg.apps.googleusercontent.com" ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
      callbackURL: `user/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const emailUser = profile.emails[0].value;
        const existUser = await User.findOne({
          where: emailUser
        });
        if (existUser) {
          done(null, profile);
        } else {
          await User.create({
            email: emailUser,
            first_name: 'After playground',
            last_name: 'After playground',
            status:"Google User"
          });
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `user/facebook/callback`,
      profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name']
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const emailUser = profile.emails[0].value;
        const existUser = await User.findOne({
          where: emailUser
        });
        if (existUser) {
          done(null, profile);
        } else {
          await User.create({
            email: emailUser,
            first_name: 'After playground',
            last_name: 'After playground',
            status:"Google User"
          });
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});