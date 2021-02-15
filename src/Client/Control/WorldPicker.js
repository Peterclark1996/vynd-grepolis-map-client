import * as React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const WorldToDisplay = (world) => world == null || world.name == null || world.code == null ? "No world selected" : world.name + " (" + world.code + ")"

function WorldPicker({ world, worldList, setSelectedWorld }) {
    return (
        <DropdownButton style={{ "padding": "10px 10px 10px 10px" }} id="dropdown-basic-button" title={WorldToDisplay(world)}>
            {worldList.map((w) => {
                return <Dropdown.Item key={w.code} onClick={() => setSelectedWorld(w)}>{WorldToDisplay(w)}</Dropdown.Item>
            })}
        </DropdownButton>
    )
}

export default WorldPicker;