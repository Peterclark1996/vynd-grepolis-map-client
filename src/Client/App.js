import * as React from 'react'
import './App.css';
import Call from './Api'
import Map from './Map'
import WorldPicker from './WorldPicker'
import Legend from './Legend'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  const [isWorldLoading, setIsWorldLoading] = React.useState(false)
  const [worldList, setWorldList] = React.useState([])

  const [selectedWorld, setSelectedWorld] = React.useState()
  const [worldState, setWorldState] = React.useState({
    alliances: [],
    players: [],
    cities: []
  })

  React.useEffect(() => {
    if (selectedWorld == null || selectedWorld.name == null || selectedWorld.code == null) return
    setIsWorldLoading(true)
    Call('getWorldData', { world: selectedWorld.code })
      .then(worldData => {
        setWorldState({
          alliances: worldData.alliances,
          players: worldData.players,
          cities: worldData.cities
        })
        setIsWorldLoading(false)
      })
  }, [selectedWorld, setIsWorldLoading]);

  React.useEffect(() => {
    Call('getWorlds')
      .then(setWorldList)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <Row>
            <Col style={{ "max-width": "350px" }}>
              <WorldPicker world={selectedWorld} worldList={worldList} setSelectedWorld={setSelectedWorld} isWorldLoading={isWorldLoading} />
              {isWorldLoading || worldState.alliances.length === 0 ? <></> : <Legend alliances={worldState.alliances.slice(0, 24)} />}
            </Col>
            <Col>
              <Map world={worldState} />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;