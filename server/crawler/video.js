const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '26782656'
const videoBase = `https://movie.douban.com/trailer/219491`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

  ; (async () => {
    console.log('start visit the target page')
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],  // 非沙箱模式
      dumpio: false
    });
    const page = await browser.newPage()
    await page.goto(base + doubanId, { 
      waitUntil: 'networkidle2'
    })
    await sleep(3000);

    const result = await page.evaluate(() => {
      let $ = window.$
      let it = $('.related-pic-video')
      if (it && it.length > 0) {
        let link = it.attr('href')
        let cover = it.find('img').attr('src')
        return {
          link,
          cover
        }
      }
      return {}
    })
    let video

    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(3000)
      video = await page.evaluate(() => {
        let $ = window.$
        let it = $('source')
        if (it && it.length > 0) {
          return it.attr('src')
        }
        return ''
      })
    } 
    const data = {
      video,
      doubanId,
      cover: result.cover
    }

    browser.close()

    process.send(data)
    process.exit(0)
  })()