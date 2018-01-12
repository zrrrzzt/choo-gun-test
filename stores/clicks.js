const Gun = require('gun')

module.exports = (state, emitter) => {
  state.totalClicks = 0

  emitter.on('DOMContentLoaded', () => {
    const gun = Gun('https://gunjs.herokuapp.com/gun')

    emitter.on('clicks:add', count => {
      state.totalClicks += count
      gun.get('choostatetest').put({totalClicks: state.totalClicks})
    })

    emitter.on('title:set', title => {
      state.header = title
      gun.get('choostatetest').put({header: title})
    })

    gun.get('choostatetest').get('header').on(value => {
      console.log('updated header from gun')
      state.header = value
      emitter.emit(state.events.RENDER)
    })

    gun.get('choostatetest').get('totalClicks').on(value => {
      console.log('updated totalClicks from gun')
      state.totalClicks = value
      emitter.emit(state.events.RENDER)
    })
  })
}
