import * as React from 'react'
import Form from 'react-bootstrap/Form'
import { useMapLayers } from './App'

const LegendEntry = ({ alliance, position, mapRef }) => {
    const [checked, setchecked] = React.useState(true)

    const checkboxName = "checkbox" + alliance.id
    const displayName = position + ": " + alliance.name

    const [mapLayers] = useMapLayers()
    const onChange = () => {
        setchecked(!checked)
        const allianceLayer = mapLayers.filter(l => l.id === alliance.id)[0]

        //TODO Fix this source of this. allianceLayer should always have a ref
        if (!allianceLayer) {
            console.log(`Failed to toggle alliance with id: ${alliance.id}. Refresh your page to fix`)
            return
        }

        if (!checked) {
            mapRef.addLayer(allianceLayer.ref.current)
        } else {
            mapRef.removeLayer(allianceLayer.ref.current)
        }
    }

    return (
        <div>
            <Form.Check inline id={checkboxName} onChange={onChange} checked={checked} />
            <b style={{ "color": alliance.colour, "fontSize": "large" }}>{displayName}</b>
        </div>
    )
};

export default LegendEntry;