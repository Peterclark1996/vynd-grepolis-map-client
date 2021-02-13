import LegendEntry from './LegendEntry.js'

const Legend = ({ alliances, map }) => {
    let pos = 1
    return (
        <div className="legend">
            <div className="legend-title">Alliances (Top {alliances.length})</div>
            {alliances.map(a => <LegendEntry key={a.id} alliance={a} position={pos++} mapRef={map} />)}
        </div>
    )
};

export default Legend;