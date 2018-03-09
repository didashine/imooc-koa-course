// service 代码为与数据库交互层代码
const mongoose = require('mongoose')
const Movie = mongoose.model('movie')

export const getAllMovies = async (type, year) => {
  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query).sort({
    'meta.createdAt': -1
  })

  return movies
}

export const getMovieDetail = async (id) => {
  return Movie.findOne({_id: id})
}

export const getRelativeMoives = (movie) => {
  return Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
}