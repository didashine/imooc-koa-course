const Router = require('koa-router')
const mongoose = require('mongoose')
const { 
  Controller,
  Get, 
  Post, 
  Put
} = require('../lib/decorator')
const { 
  getAllMovies,
  getMovieDetail,
  getRelativeMoives
}  = require('../service/movies')
const router = new Router()

@Controller('/movies')
export default class MovieController {
  @Get('/all')
  async getMoviesList (ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      movies
    }
  }
  @Get('detail/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMoives(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}



