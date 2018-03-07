const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('movie')

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, [])

  let invoked = false  //标记子进程是否被调用

  // 进程与事件是相关的，所以可以调用事件的监听
  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  //监听进程完成
  child.on('exit', code => {
    if (invoked) return

    invoked = true
    let err = code !== 0 ? null : `code exit ${code}`

    console.log(err)
  })

  // 监听进程发送的信息？
  child.on('message', data => {
    let result = data.result
    
    result.forEach(async item => {
      let movie = await Movie.findOne({
        doubanId: item.doubanId
      })

      if (!movie) { 
        movie = new Movie(item)
        await movie.save()
      }
    })
    console.log(result)
  })
})()