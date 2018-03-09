const Router = require('koa-router')
const mongoose = require('mongoose')
const {
  Controller,
  Get,
  Post,
  Put
} = require('../lib/decorator')
const {
  checkPassword
} = require('../service/admin')
const router = new Router()

@Controller('/user')
export default class UserController {
  @Post('/')
  async login (ctx, next) {
    const { email, password } = ctx.request.query
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不存在'
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }

    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }
}