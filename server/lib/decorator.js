const Router = require('koa-router')
const _ = require('lodash')
const glob = require('glob')
// 是一个函数，可以返回一个symbol类型值,有自己的静态属性和方法
// 一旦创建不能修改,Symbol中的值都不能重复
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const isArray = c => _.isArray(c) ? c : [c]
const { resolve } = require('path')

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

// 变成合理的路径
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`

export const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  
  routerMap.set({
    target: target,
    ...conf
  }, target[key])

  
}

// 在route中被当做装饰器使用 (@controller） 可以返回一个function并在其中中拿到当前的装饰器属性(target)
// 这里将调用@controller时传入的前缀path参数赋给target原型上的Symbol属性
export const Controller = path => target => (target.prototype[symbolPrefix] = path)

export const Get = path => router({
  method: 'get',
  path: path
})

export const Post = path => router({
  method: 'post',
  path: path
})

export const Put = path => router({
  method: 'put',
  path: path
})

export const Delete = path => router({
  method: 'delete',
  path: path
})

export const Use = path => router({
  method: 'use',
  path: path
})

export const All = path => router({
  method: 'all',
  path: path
})