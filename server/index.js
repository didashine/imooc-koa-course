const Koa = require('koa')
const app = new Koa()
const { normal } = require('./tpl/index.js')
const { connect, initSchemas } = require('./dateBase/init')
const { resolve } = require('path')
const mongoose = require('mongoose')
const R = require('ramda')
const MIDDLEWARES = ['router']
 
;(async () => {
  try {
    await connect()
    initSchemas()
    // require('./tasks/movie.js')
    // require('./tasks/api')
    const useMiddlewares = (app) => {
      R.map(
        R.compose(
          R.forEachObjIndexed(
            initWith => initWith(app)
          ),
          require,
          name => resolve(__dirname, `./middlewares/${name}`)
        )
      )(MIDDLEWARES)
    }

    await useMiddlewares(app)
  } catch (e) {
    console.log(e)
  } 
})()

app.listen(4455)