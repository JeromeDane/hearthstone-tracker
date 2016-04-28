import home from './pages/home'
import games from './pages/games'
import about from './pages/about'

export default (state) => {
  const {url} = state,
        pages = {home, games, about},
        pageNameMatches = url.match(/^\/([^\/]+)/),
        pageName = pageNameMatches ? pageNameMatches[1] : 'home',
        page = pages[pageName](state),
        menuClasses = 'btn button-narrow white ',
        activeColor = 'yellow',
        homeClasses = menuClasses + (pageName === 'home' ? 'yellow' : ''),
        gamesClasses = menuClasses + (pageName === 'games' ? 'yellow' : ''),
        aboutClasses = menuClasses + (pageName === 'about' ? 'yellow' : '')

  return (
    <main>
      <h1 className="h1 navy">Hearthstone Tracker</h1>
      <nav className="block bg-navy mb2">
        <div className="bg-lighten-2">
          <a href='/' className={homeClasses}>Home</a>
          <a href='/games' className={gamesClasses}
             data-click={{type: 'update-games'}}>Games</a>
          <a href='/about' className={aboutClasses}>About</a>
        </div>
      </nav>
      {page}
    </main>)}
