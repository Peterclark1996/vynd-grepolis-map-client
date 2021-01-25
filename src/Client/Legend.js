import LegendEntry from './LegendEntry.js'

const Legend = ({ alliances }) => {
    let pos = 1
    return (
        <div>
            <h1>Alliances (Top {alliances.length})</h1>
            {alliances.map(a => <LegendEntry key={a.id} alliance={a} position={pos++} />)}
        </div>
    )
};

export default Legend;