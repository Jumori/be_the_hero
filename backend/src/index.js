// IMPORTING DEPENDENCIES ------------------------------------------------------
const express = require('express');
const cors = require('cors');

// IMPORTING FILES -------------------------------------------------------------
const routes = require('./routes');

/**
 * ROUTE / CONTROLLERS
 */

/**
 * HTTP METHODS:
 * GET POST PUT DELETE
 */

/**
 * PARAMETERS
 * Query Params: named parameters sent in the route after "?" (it's used for filters, paginations)
 * Route Params: parameters used to identify resources ({route}/:id})
 * Request Body:
 */

/**
 * DATABASE
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Serves vs NoSQL: MongoDB, CouchDB
 * Driver: SELECT * FROM user
 * Query Builder: table('user').select('*').where()
 */

// CREATE OUR APP --------------------------------------------------------------
const app = express();

// SETTING JSON AS DEFAULT FOR REQUEST BODY
app.use(cors());
app.use(express.json());
app.use(routes);


// LISTEN TO PORT 3333
app.listen(3333);