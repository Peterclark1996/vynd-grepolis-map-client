import LegendEntry from './LegendEntry.js'

const Legend = ({ alliances }) => {
    let pos = 1
    return (
        <div className="legend">
            <div className="legend-title">Alliances (Top {alliances.length})</div>
            {alliances.map(a => <LegendEntry key={a.id} alliance={a} position={pos++} />)}
        </div>
    )
};

export default Legend;