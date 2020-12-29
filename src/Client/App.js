import * as React from 'react'
import './App.css';
import Call from './Api'
import Map from './Map';

function App() {
  const [world, setWorld] = React.useState('')
  const [worldList, setWorldList] = React.useState([])

  React.useEffect(() => {
    Call('worlds')
      .then(setWorldList)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Map />
      </header>
    </div>
  );
}

export default App;