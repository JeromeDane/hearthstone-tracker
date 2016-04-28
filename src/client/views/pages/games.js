import gamePreview from '../components/game-preview'

export default (state) => {

  if(!state.games && !state.gamesLoading) {
    state.trigger({type: 'update-games'})
  }

  return (
    <div className="">
      <div className="p1 pl0 mb1 border-bottom">
        Recent Games
      </div>
      {state.games ?
        <div>
        {
          state.games.map(game => {
            console.log(game)
            return gamePreview(state, game)
          })
        }
        </div> :
        <div></div>
      }
    </div>
  )
}
