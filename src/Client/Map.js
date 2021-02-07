import * as React from 'react'
import { MapContainer, LayersControl } from "react-leaflet"
import L from "leaflet"
import Call from './Api'
import Alliance from './Alliance'
import Legend from './Legend'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Map({ world, setIsWorldLoading }) {
    const [worldState, setWorldState] = React.useState({
        alliances: [],
        players: [],
        cities: []
    })

    React.useEffect(() => {
        if (world == null || world.name == null || world.code == null) return
        setIsWorldLoading(true)
        Call('getWorldData', { world: world.code })
            .then(worldData => {
                setWorldState({
                    alliances: worldData.alliances,
                    players: worldData.players,
                    cities: worldData.cities
                })
                setIsWorldLoading(false)
            })
    }, [world]);

    return (
        <Container>
            <Row>
                <Col>
                    <Legend alliances={worldState.alliances} />
                </Col>
                <Col>
                    <MapContainer center={[500, 500]} zoom={1} scrollWheelZoom={true} bounds={[[1000, 0], [0, 1000]]} crs={L.CRS.Simple} minZoom={0} maxZoom={10}>
                        <LayersControl>
                            {worldState.alliances.map(a => {
                                return <Alliance key={a.id} state={worldState} alliance={a} />
                            })}
                        </LayersControl>
                    </MapContainer>
                </Col>
            </Row>
        </Container>

    )
}

export default Map;