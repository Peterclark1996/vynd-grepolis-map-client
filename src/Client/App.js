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
        <WorldPicker world={world} worldList={worldList} setWorld={setWorld} isWorldLoading={isWorldLoading} />
        {world ? <Map world={world} setIsWorldLoading={setIsWorldLoading} /> : <></>}
      </header>
    </div>
  );
}

export default App;

{/* <Container fluid>
    <Row>
        <Col style={{ "max-width": "350px" }}>
            <Legend alliances={worldState.alliances} />
        </Col>
        <Col>
            <MapContainer center={[500, 500]} zoom={1} scrollWheelZoom={true} bounds={[[1000, 0], [0, 1000]]} crs={L.CRS.Simple} minZoom={0} maxZoom={10}>
                <LayerGroup>
                    <ImageOverlay bounds={[[1000, 0], [0, 1000]]} url={gridUrl} />
                </LayerGroup>
                {worldState.alliances.map(a => {
                    return <Alliance key={a.id} state={worldState} alliance={a} />
                })}
            </MapContainer>
        </Col>
    </Row>
</Container> */}