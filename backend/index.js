// IMPORTING DEPENDENCIES
const express = require('express');

/**
 * ROUTE / CONTROLLERS
 */

/**
 * HTTP METHODS:
 * 
 * GET POST PUT DELETE
 */

/**
 * PARAMETERS
 */

// CREATE OUR APP
const app = express();
app.get('/', (request, response) => {
  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluno: 'Juliana'
  });
});

// LISTEN TO PORT 3333
app.listen(3333);