const express = require('express');
const passport = require('passport');
const UserproductsService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// importamos los schemas para generar la validation
const { productIdSchema } = require('../utils/schemas/products');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieShema } = require('../utils/schemas/userproduct');
const joi = require('@hapi/joi');
// JWT Strategy
require('../utils/auth/strategies/jwt');

function userproductApi(app) {
  const router = express.Router();
  app.use('/api/user/', router);

  const UserproductService = new UserproductsService();

  router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['read:user-product']),
    validationHandler(joi.object({ userId: userIdSchema }), 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userproduct = await UserproductService.getUser({ userId });

        res.status(200).json({
          data: userproduct,
          message: 'use movies listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-product']),
    validationHandler(joi.object(createUserMovieShema)),
    async (req, res, next) => {
      const { body: userMovie } = req;

      try {
        // vamos a recibir
        const createUserMovieId = await UserproductService.createUserMovieShema({
          userMovie
        });

        res.status(201).json({
          data: createUserMovieId,
          message: 'user product created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-product']),
    validationHandler(joi.object({ userMovieId:  productIdSchema}), 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;

      try {
        const deleteUserMovieId = await UserproductService.deleteUserMovieId({
          userMovieId
        });

        res.status(200).json({
          data: deleteUserMovieId,
          message: 'user  deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userproductApi;
