import * as React from 'react'
import Call from './Api'
import Map from './View/Map'
import WorldPicker from './Control/WorldPicker'
import Legend from './Control/Legend'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import * as MapLayers from './Context/MapLayerContext'

function AppContent() {
    const [worldList, setWorldList] = React.useState([])
    const [isWorldListLoading, setIsWorldListLoading] = React.useState(false)
    const [worldListError, setWorldListError] = React.useState(null)

    const [selectedWorld, setSelectedWorld] = React.useState()

    const [worldState, setWorldState] = React.useState({
        alliances: [],
        players: [],
        cities: []
    })
    const [isWorldStateLoading, setIsWorldStateLoading] = React.useState(false)
    const [worldStateError, setWorldStateError] = React.useState(null)

    const [map, setMap] = React.useState(null)

    const [, setMapLayers] = MapLayers.useMapLayers()

    React.useEffect(() => {
        if (selectedWorld == null || selectedWorld.name == null || selectedWorld.code == null) return
        setIsWorldStateLoading(true)
        setWorldStateError(null);
        Call('getWorldData', { world: selectedWorld.code })
            .then(worldData => {
                if (worldData.error) {
                    console.error(worldData.error)
                    setWorldStateError("Failed to load world")
                    return
                }

                setMapLayers([])
                setWorldState({
                    alliances: worldData.alliances,
                    players: worldData.players,
                    cities: worldData.cities
                })
                setIsWorldStateLoading(false)
            })
    }, [selectedWorld, setIsWorldStateLoading, setMapLayers]);

    React.useEffect(() => {
        setIsWorldListLoading(true)
        setWorldListError(null)
        Call('getWorlds')
            .then(worlds => {
                if (worlds.error) {
                    console.error(worlds.error)
                    setWorldListError("Failed to get world list")
                    return
                }
                setWorldList(worlds)
                setIsWorldListLoading(false)
            })
    }, []);

    const shouldDisplayWorldPicker = worldList !== null && worldList.length !== 0 && !isWorldStateLoading
    const shouldDisplayLegend = (worldState && worldState.alliances && worldState.alliances.length !== 0 && !isWorldStateLoading) || false

    const isLoading = isWorldListLoading || isWorldStateLoading
    const isError = worldListError || worldStateError

    return (
        <Container fluid>
            <Row>
                <Col style={{ "maxWidth": "350px" }}>
                    {shouldDisplayWorldPicker && !worldListError ? <WorldPicker world={selectedWorld} worldList={worldList} setSelectedWorld={setSelectedWorld} /> : <></>}
                    {shouldDisplayLegend && !worldStateError ? <Legend alliances={worldState.alliances} map={map} /> : <></>}
                    {isLoading && !isError ? <Spinner animation="border" variant="primary" /> : <></>}
                    {isError ? <b style={{ "color": "#ff0000", "fontSize": "large" }}>Error loading, please refresh your page</b> : <></>}
                </Col>
                <Col style={{ "padding": "0px 0px 0px 0px" }}>
                    <Map worldState={worldState} setMap={setMap} />
                </Col>
            </Row>
        </Container>
    )
}

export default AppContent;