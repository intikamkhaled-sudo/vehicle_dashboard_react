import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function TelemetryChart({
    title,
    data,
    dataKey,
    color,
    unit
}) {

    return (

        <section className="panel">

            <div className="panel-header">
                {title}
            </div>

            <div
                className="panel-body"
                style={{ height: 250 }}
            >

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid stroke="#2d3446" />

                        <XAxis
                            dataKey="time"
                            tick={{ fill: "#aaa", fontSize: 11 }}
                        />

                        <YAxis
                            tick={{ fill: "#aaa", fontSize: 11 }}
                        />

                        <Tooltip
                            formatter={(value) => [
                                `${value} ${unit}`,
                                title
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

}

export default TelemetryChart;