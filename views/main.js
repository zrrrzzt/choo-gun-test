var html = require('choo/html')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        ${state.header}
      </h1>

      <div class="ph3 ph4-ns">
        <p>Current number of clicks: ${state.totalClicks}</p>

        <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" data-value="1" onclick=${handleClick}>Click Me to +1</button>
        <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" data-value="-1" onclick=${handleClick}>Click Me to -1</button>
        <input type="text" name="title" id="titleField"><button onclick=${handleForm}>Set title</button>
      </div>
    </body>
  `

  function handleClick (e) {
    emit('clicks:add', parseInt(e.target.dataset.value, 10))
  }

  function handleForm () {
    emit('title:set', document.getElementById('titleField').value)
  }
}
