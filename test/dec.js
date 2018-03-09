// class Boy {
//   @speak('chinese')
//   run () {
//     console.log('i can speak ' + this.language )
//     console.log('I can run!')
//   }
// }

// function speak(language) {
//   return eat({
//     a: 1,
//     b: 2
//   })
// }

// function eat(conf) {
//   return function (target, key, description) {
//     target.language = conf.a
//     console.log(speak)
//   }
// }
// const luke = new Boy()

// luke.run()

const routerMap = new Map()

routerMap.set({
  a: 1,
  b: 2
}, () => {
  return a + b
})

routerMap.set({
  a: 1,
  b: 2
}, '3')

console.log(routerMap)