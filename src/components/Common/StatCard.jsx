function StatCard({ title, value }) {

    return (

        <div className="stat-card">

            <span className="stat-title">

                {title}

            </span>

            <h4>

                {value}

            </h4>

        </div>

    );

}

export default StatCard;