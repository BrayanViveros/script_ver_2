const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const Usuarios = require('./models/Usuario.model');

const app = express();

// Configuración de Passport
 passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await Usuarios.findOne({ username });

      if (!user || !user.validarContraseña(password)) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuarios.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(expressSession({ secret: 'tu-secreto', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

