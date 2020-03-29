const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const sessionController = require('./controllers/sessionController');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController.js');
const profileController = require('./controllers/profileController.js');

const routes = express.Router();

// ROUTES ----------------------------------------------------------------------
// SESSION ROUTES --------------------------------------------------------------
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.object().keys({
      id: Joi.string().required()
    })
  })
}), sessionController.create);

// ONGS ROUTES -----------------------------------------------------------------
routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    ong: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.number().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  })
}), ongController.create);

// INCIDENTS ROUTES ------------------------------------------------------------
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), incidentController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    incident: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    })
  })
}), incidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentController.delete);

// PROFILE ROUTES --------------------------------------------------------------
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), profileController.index);


// EXPORTS ---------------------------------------------------------------------
module.exports = routes;