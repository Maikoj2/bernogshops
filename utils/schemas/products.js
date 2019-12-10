const joi = require('@hapi/joi');

// llamamos join.string para indicar que es un string
/**
 * llamamos regex porque los ids de mongodb tienen cierta estructura y es una muy buena
 * forma de validarlo mediante un regex, porque son una collection de caracteres alphanumericos
 * que tienen un minimo de 24 caracteres.
 * 
 * /^[0-9]: inicia con cualquiera de los caracteres alphanumericos del 0 al 9
 * /^[0-9a-fA-F]: de la a minuscula a la f minuscula, y de la A mayuscula a la F mayúscula
 * /^[0-9a-fA-F]{24}$/: puede tener un tamaño de 24 y así es com debe terminar.
 */

const productIdSchema = joi.object().keys({
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

const createproductSchema = joi.object().keys({
  name:  joi.string().max(80).required(),
  price:  joi.number().min(50).max(9999999).required(),
  pricesale:  joi.number().min(50).max(9999999).required(),
  description:  joi.string().max(300).required(), 
  model:  joi.string().max(15).required(),
  category:  joi.string().max(20).required(),
  source:  joi.string().required(),
  tags: joi.string().max(20)
});

// Solo vamos a actualizar una parte de la pelicula
const updateproductSchema = joi.object().keys({
  name: joi.string().max(80),
  price: joi.number().min(50).max(9999999),
  pricesale: joi.number().min(50).max(9999999),
  description: joi.string().max(300),
  model: joi.string().max(15),
  category: joi.string().max(20),
  source: joi.string(),
  tags: joi.string().max(20)
});

module.exports = {
  productIdSchema,
  createproductSchema,
  updateproductSchema
};