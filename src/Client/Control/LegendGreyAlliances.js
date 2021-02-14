import * as React from 'react'
import Form from 'react-bootstrap/Form'
import * as MapLayers from '../Context/MapLayerContext'

function LegendGreyAlliances({ alliances, mapRef }) {
    const [checked, setchecked] = React.useState(true)

    const checkboxName = "checkboxgrey"
    const displayName = "Toggle players in alliances less than 24th"

    const [mapLayers] = MapLayers.useMapLayers()

    const onChange = () => {
        setchecked(!checked)

        const allianceLayers = mapLayers.filter(l => alliances.filter(a => l.id === a.id).length === 1)

        if (!checked) {
            allianceLayers.forEach(l => mapRef.addLayer(l.ref.current))
        } else {
            allianceLayers.forEach(l => mapRef.removeLayer(l.ref.current))
        }
    }

    return (
        <div>
            <Form.Check inline id={checkboxName} onChange={onChange} checked={checked} />
            <b style={{ "fontSize": "large" }}>{displayName}</b>
        </div>
    )
}

export default LegendGreyAlliances