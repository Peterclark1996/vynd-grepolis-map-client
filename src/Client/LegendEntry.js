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
        if (!checked) {
            mapRef.addLayer(allianceLayer.ref.current)
        } else {
            mapRef.removeLayer(allianceLayer.ref.current)
        }
    }

    return (
        <div>
            <Form.Check inline id={checkboxName} onChange={onChange} checked={checked} />
            {displayName}
        </div>
    )
};

export default LegendEntry;