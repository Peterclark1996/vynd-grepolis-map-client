import * as React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const WorldDisplay = (world) => world == null || world.name == null || world.code == null ? "No world selected" : world.name + " (" + world.code + ")"

function WorldPicker({ world, worldList, setWorld, isWorldLoading }) {

    function ChangeWorld(newWorld) {
        setWorld(newWorld)
    }

    return (
        <Container>
            <Row>
                <DropdownButton id="dropdown-basic-button" title={WorldDisplay(world)}>
                    {worldList.map((w) => {
                        return <Dropdown.Item key={w.code} onClick={() => ChangeWorld(w)}>{WorldDisplay(w)}</Dropdown.Item>
                    })}
                </DropdownButton>
                {isWorldLoading ? <Spinner animation="border" variant="primary" /> : <></>}
            </Row>
        </Container>
    )
}

export default WorldPicker;