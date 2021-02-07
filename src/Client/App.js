import * as React from 'react'
import './App.css';
import Call from './Api'
import Map from './Map'
import WorldPicker from './WorldPicker'

function App() {
  const [isWorldLoading, setIsWorldLoading] = React.useState(false)
  const [world, setWorld] = React.useState()
  const [worldList, setWorldList] = React.useState([])

  React.useEffect(() => {
    Call('getWorlds')
      .then(setWorldList)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="p-1">
          <WorldPicker world={world} worldList={worldList} setWorld={setWorld} isWorldLoading={isWorldLoading} />
        </div>
        {world ? <Map world={world} setIsWorldLoading={setIsWorldLoading} /> : <></>}
      </header>
    </div>
  );
}

export default App;