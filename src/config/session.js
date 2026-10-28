const Env = require('./env');

class Session {
  static getOptions() {
    return {
      secret: Env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 2 }
    };
  }
}

module.exports = Session;
