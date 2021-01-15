import * as React from 'react'
import City from './City'

function Player({ state, player, alliance }) {
    return (
        <>
            {
                state.cities
                    .filter((c) => c.playerId === player.id)
                    .map((c) => {
                        return <City key={c.id} city={c} player={player} alliance={alliance} />
                    })
            }
        </>
    )
}

export default Player;