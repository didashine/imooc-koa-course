const Router = require('koa-router')
const mongoose = require('mongoose')


const router = new Router()

router.get('/movie/all', async (ctx, next) => {
  const Movie = mongoose.model('movie')
  const movies = await Movie.find({}).sort({
    'meta.createdAt': -1
  })

  ctx.body = {
    movies
  }
})

router.get('/movie/details/:id', async (ctx, next) => {
  const Movie = mongoose.model('movie')
  const id = ctx.params.id
  const movies = await Movie.findOne({}).sort({_id: id})

  ctx.body = {
    movies
  }
})

module.exports = router

