import * as React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Spinner from 'react-bootstrap/Spinner'

const WorldToDisplay = (world) => world == null || world.name == null || world.code == null ? "No world selected" : world.name + " (" + world.code + ")"

function WorldPicker({ world, worldList, setSelectedWorld, isWorldLoading }) {
    const isWorldListLoading = worldList === null || worldList.length === 0
    return (
        <div>
            { isWorldListLoading || isWorldLoading ?
                <Spinner animation="border" variant="primary" /> :
                <DropdownButton id="dropdown-basic-button" title={WorldToDisplay(world)}>
                    {worldList.map((w) => {
                        return <Dropdown.Item key={w.code} onClick={() => setSelectedWorld(w)}>{WorldToDisplay(w)}</Dropdown.Item>
                    })}
                </DropdownButton>
            }
        </div>
    )
}

export default WorldPicker;