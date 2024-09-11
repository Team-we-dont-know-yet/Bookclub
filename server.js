const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const clubRoutes = require('./controllers/api/clubRoutes')
const memberRoutes = require('./controllers/api/memberRoutes')
const sequelize = require('./config/connection');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto'
  }
}));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.memberName = req.session.memberName;
  next();
});

app.engine('handlebars', exphbs.engine({ 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  defaultLayout: 'main' 
}));


app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);
app.use('/', memberRoutes);
app.use('/api/clubs', clubRoutes);

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log('Now listening'));
});
