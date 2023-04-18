'use strict';

require('dotenv').config();
const { start } = require('./server.js');
const { db } = require('./models/index');


db.sync().then(() => {
  start(process.env.PORT);
});



