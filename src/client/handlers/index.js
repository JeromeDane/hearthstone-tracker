import request from 'superagent'

export default function(state, type, payload) {
  switch(type) {
    case 'increment':
      state.count++
      break
    case 'decrement':
      state.count--
      break
    case 'update-games':
      delete state.games
      state.gamesLoading = true
      request.get('/api/games').end((err, res) => {
        if(!err) {
          state.gamesLoading = false
          state.games = res.body
          state.render()
        }
      })
      break
    case 'setUrl':
      state.url = payload
      break
  }
}
