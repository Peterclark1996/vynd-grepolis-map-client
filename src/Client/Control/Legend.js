import LegendEntry from './LegendEntry.js'

const Legend = ({ alliances, map }) => {
    const topAlliances = alliances.slice(0, 24)

    let pos = 1
    return (
        <div className="legend">
            <div className="legend-title">Alliances (Top {alliances.length})</div>
            {topAlliances.map(a => <LegendEntry key={a.id} alliance={a} position={pos++} mapRef={map} />)}
        </div>
    )
};

export default Legend;