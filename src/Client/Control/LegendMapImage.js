import * as React from 'react'
import Form from 'react-bootstrap/Form'

function LegendMapImage({ setShouldShowMapGraphics }) {
    const [checked, setchecked] = React.useState(true)

    const checkboxName = "checkboxmapimage"
    const displayName = "Show map graphics"

    const onChange = () => {
        setchecked(!checked)

        if (!checked) {
            setShouldShowMapGraphics(true)
        } else {
            setShouldShowMapGraphics(false)
        }
    }

    return (
        <div>
            <Form.Check inline id={checkboxName} onChange={onChange} checked={checked} />
            <b style={{ "fontSize": "large" }}>{displayName}</b>
        </div>
    )
}

export default LegendMapImage