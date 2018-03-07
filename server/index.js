const Koa = require('koa')
const app = new Koa()
const { normal } = require('./tpl/index.js')
const { connect, initSchemas } = require('./dateBase/init')
const mongoose = require('mongoose')
const router = require('./routes')
;(async () => {
  await connect()
  initSchemas()
  // const Movie = mongoose.model('movie')
  // const movies = await Movie.find({})
  // console.log(movies)
  // require('./tasks/movie.js')
  require('./tasks/api')
})()

app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = normal
})

app.listen(4455)