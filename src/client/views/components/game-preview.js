import moment from 'moment'

export default (state, game) => {

  const iconStyle = 'max-height:1.5em; max-width:1.5em',
        start = moment(game.start),
        end = moment(game.end),
        duration = moment.duration(start.diff(end))

  return (
    <div className="p1 flex items-baseline">
      <div className="col-2 nowrap">
        <img src={'/assets/images/class-icons/' +
                game.playerClass.toLowerCase() + '-64.png'}
             title={game.playerClass}
             className="mr1 align-middle"
             style={iconStyle}/>
        <div className="inline mr1">{game.playerName}</div>
      </div>
      <div className="inline ml1 mr2">vs.</div>
      <div className="col-2 nowrap">
        <img src={'/assets/images/class-icons/' +
                game.opponentClass.toLowerCase() + '-64.png'}
             title={game.opponentClass}
             className="mr1 align-middle"
             style={iconStyle}/>
        <div className="inline mr1">{game.opponentName}</div>
      </div>
      <div className="inline mr1">({game.result})</div>
      <div className="col-3">
        <div className="inline mr0">
          {Math.ceil(game.turns / 2)} turn{game.turns > 2 ? 's' : ''}
        </div>
        <div className="inline mr0"> / </div>
        <div className="inline mr1">{duration.humanize()}</div>
      </div>
      <div className="col-2 mr1">{end.calendar()}</div>
    </div>
  )

}
