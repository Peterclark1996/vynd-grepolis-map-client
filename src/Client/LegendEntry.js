import * as React from 'react'
import Form from 'react-bootstrap/Form'

const LegendEntry = ({ alliance, position }) => {
    const [checked, setchecked] = React.useState(true)

    const checkboxName = "checkbox" + alliance.id
    const displayName = position + ": " + alliance.name

    const onChange = () => {
        setchecked(!checked)
    }

    return (
        <div>
            <Form.Check inline id={checkboxName} onChange={onChange} checked={checked} />
            {displayName}
        </div>
    )
};

export default LegendEntry;