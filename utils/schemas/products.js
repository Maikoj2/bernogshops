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

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(80);
const productpriceSchema = joi.number().min(50).max(9999999);
const productpricesaleSchema = joi.number().min(50).max(9999999);
const productDescriptionSchema = joi.string().max(300);
const productmodelSchema = joi.string().max(15);
const productcategorychema = joi.string().max(20);
const productourceSchema = joi.string();
const productTagsSchema =joi.string().max(20);

const createproductSchema = {
 
  name: productNameSchema.required(),
  price: productpriceSchema.required(),
  pricesale: productpricesaleSchema.required(),
  description: productDescriptionSchema.required(), 
  model: productmodelSchema.required(),
  category: productcategorychema.required(),
  source: productourceSchema.required(),
  tags: productTagsSchema
};

// Solo vamos a actualizar una parte de la pelicula
const updateproductSchema = {
  name: productNameSchema,
  price: productpriceSchema,
  pricesale: productpricesaleSchema,
  description: productDescriptionSchema,
  model: productmodelSchema,
  category: productcategorychema,
  source: productourceSchema,
  tags: productTagsSchema
};

module.exports = {
  productIdSchema,
  createproductSchema,
  updateproductSchema
};