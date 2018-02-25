const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
console.log(111);
(async () => {
  console.log('start visit the target page')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],  // 非沙箱模式
    dumpio: false
  });
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000);

  await page.waitForSelector('.more') // 等待查找到.more类名的元素
  for (let i=0; i < 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }
  const result = await page.evaluate(() => {
    let $ = window.$
    let links = []
    let items = $('.list-wp a')
    if (items.length >= 1) {
      items.each((index,ele) => {
        let it = $(ele)
        let doubanId = it.find('.cover-wp').data('id')
        let title = it.find('.title').text()
        let rate = it.find('.rate').text()
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })

  browser.close()

  console.log(result)
})()