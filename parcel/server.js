const Koa = require('koa')
const serve = require('koa-static')

const { resolve } = require('path')

const app = new Koa()

app.use(serve(__dirname, './'))

app.listen(4455)