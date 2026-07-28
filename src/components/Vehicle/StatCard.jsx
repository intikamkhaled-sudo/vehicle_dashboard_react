function StatCard({ title, value }) {
    return (
        <div className="stat-item">

            <span className="channel-label">
                {title}
            </span>

            <h3 className="mono">
                {value}
            </h3>

        </div>
    );
}

export default StatCard;