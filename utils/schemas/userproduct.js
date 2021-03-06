const joi = require('@hapi/joi');

const { movieIdSchema } = require('./products');
const { userIdSchema } = require('./users');

// schema de las peliculas de usuario

const userMovieIdSchema = joi.object().keys({
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/) 
})

// creamos el schema de una pelicula de usuario

const createUserMovieShema = joi.object().keys({
  userId: userIdSchema,
  movieId: movieIdSchema
});

module.exports = {
  userMovieIdSchema,
  createUserMovieShema
};