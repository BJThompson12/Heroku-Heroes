const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(routes);

 sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`🚀 Now listening on Port ${PORT} 🖥️`));
});
