import * as React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const WorldDisplay = (world) => world == null || world.name == null || world.code == null ? "No world selected" : world.name + " (" + world.code + ")"

function WorldPicker({ world, worldList, setWorld }) {

    function ChangeWorld(newWorld) {
        setWorld(newWorld)
    }

    return (
        <div className="w-15">
            <DropdownButton id="dropdown-basic-button" title={WorldDisplay(world)}>
                {worldList.map((w) => {
                    return <Dropdown.Item key={w.code} onClick={() => ChangeWorld(w)}>{WorldDisplay(w)})</Dropdown.Item>
                })}
            </DropdownButton>
        </div>
    )
}

export default WorldPicker;