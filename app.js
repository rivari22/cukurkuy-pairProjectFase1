const express = require('express');
const { urlencoded } = require('express');
const routes = require('./routes/index')
const app = express();
const port = 3000;
const session = require("express-session")

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})