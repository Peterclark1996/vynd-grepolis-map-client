import LegendAlliance from './LegendAlliance.js'
import LegendGreyAlliances from './LegendGreyAlliances.js'

const Legend = ({ alliances, map }) => {
    const topAlliances = alliances.slice(0, 24)
    const otherAlliances = alliances.slice(24)

    let pos = 1
    return (
        <div className="legend">
            <LegendGreyAlliances alliances={otherAlliances} mapRef={map} />
            <div className="legend-title">Alliances (Top {alliances.length})</div>
            {topAlliances.map(a => <LegendAlliance key={a.id} alliance={a} position={pos++} mapRef={map} />)}
        </div>
    )
};

export default Legend;