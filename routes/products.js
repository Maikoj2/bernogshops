const express = require('express');
const passport = require('passport');
const productServices = require('../services/products');
const joi = require('@hapi/joi');
require('../utils/auth/strategies/jwt');
const {
  productIdSchema,
  createproductSchema,
  updateproductSchema
} = require('../utils/schemas/products');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function productApi(app) {
  const router = express.Router();
  app.use('/api/product', router);

  const productService = new productServices();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:product']),
    async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const product = await productService.getproducts({ tags });
      // throw new Error("Error getting product");
      console.log(product)
      res.status(200).json({
        data: product,
        message: 'product listed'
      });
    } catch (error) {
      next(error);
    }
  });

  // Obtener product por id
  router.get(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:product']),
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;
      try {
        const product = await productService.getproductid({ productId });
        res.status(200).json({
          data: product,
          message: 'product retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // create
  router.post('/',
  passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:product']),
     validationHandler(joi.object(createproductSchema)), async function(
    req,
    res,
    next
  ) {
    const { body: product } = req;
    try {
      const createdproductId = await productService.createproduct({ product });
      res.status(201).json({
        data: createdproductId,
        message: 'product created'
      });
    } catch (error) {
      next(error);
    }
  });

  // PUT - actualizar
  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:product']),
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    validationHandler(joi.object(updateproductSchema)),
    async function(req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const updatedproductId = await productService.updateproduct({
          productId,
          product
        });
        res.status(200).json({
          data: updatedproductId,
          message: 'product updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // delete
  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:product']),
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    async function(req, res, next) {
      const { productId } = req.params;
      try {
        const deleteproductId = await productService.deletedproduct({ productId });
        res.status(200).json({
          data: deleteproductId,
          message: 'product deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}
// Ahora tenemos que exportarla, porque aquí estamos definiendo la ruta pero no la estamos usando
// en nuestra aplicación de express

module.exports = productApi;
