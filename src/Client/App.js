import * as React from 'react'
import './App.css';
import Call from './Api'
import Map from './Map';
import WorldPicker from './WorldPicker';

function App() {
  const [world, setWorld] = React.useState()
  const [worldList, setWorldList] = React.useState([])

  React.useEffect(() => {
    Call('worlds')
      .then(setWorldList)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="p-1">
          <WorldPicker world={world} worldList={worldList} setWorld={setWorld} />
        </div>
        <Map world={world} />
      </header>
    </div>
  );
}

export default App;