function KpiCard({ title, value, accent = "" }) {

    return (

        <div className="kpi-card">

            <span className={`channel-label ${accent}`}>
                {title}
            </span>

            <h2>{value}</h2>

        </div>

    );

}

export default KpiCard;