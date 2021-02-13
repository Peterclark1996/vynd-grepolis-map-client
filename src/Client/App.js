import * as React from 'react'
import './App.css';
import Call from './Api'
import Map from './Map'
import WorldPicker from './WorldPicker'
import Legend from './Legend'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MapLayersContext = React.createContext()

function MapLayersProvider(props) {
  const [mapLayers, setMapLayers] = React.useState([])
  const value = [mapLayers, setMapLayers]
  return <MapLayersContext.Provider value={value} {...props} />
}

export function useMapLayers() {
  return React.useContext(MapLayersContext)
}

function App() {
  const [worldList, setWorldList] = React.useState([])

  const [selectedWorld, setSelectedWorld] = React.useState()
  const [isWorldLoading, setIsWorldLoading] = React.useState(false)
  const [worldState, setWorldState] = React.useState({
    alliances: [],
    players: [],
    cities: []
  })

  const [map, setMap] = React.useState(null)

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
        <MapLayersProvider>
          <Container fluid>
            <Row>
              <Col style={{ "maxWidth": "350px" }}>
                <WorldPicker world={selectedWorld} worldList={worldList} setSelectedWorld={setSelectedWorld} isWorldLoading={isWorldLoading} />
                {isWorldLoading || worldState.alliances.length === 0 ? <></> : <Legend alliances={worldState.alliances.slice(0, 24)} map={map} />}
              </Col>
              <Col style={{ "padding": "0px 0px 0px 0px" }}>
                <Map world={worldState} setMap={setMap} />
              </Col>
            </Row>
          </Container>
        </MapLayersProvider>
      </header>
    </div>
  );
}

export default App;