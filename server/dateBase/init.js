const mongoose = require('mongoose')
const db = 'mongodb://localhost/imooc-douban'
// node下允许使用*匹配符的模块
const glob = require('glob')
const { resolve } = require('path')

mongoose.promise = global.Promise;

exports.initSchemas = () => {
  // 同步拿到当前目录下schma下的所有js文件 不管是否有嵌套,拿到的结构为数组
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    // 5.x版本不用加 useMongoClient:true
    mongoose.connect(db)

    // 监听断开连接,重新连接
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库GG')
      }

    })

    // 监听错误
    mongoose.connection.on('error', err => {
      reject(err)
      console.log(err)
    })

    // 监听连接成功
    mongoose.connection.once('open', () => {
      console.log('Mongodb client success')
      resolve()
    })
  })
}