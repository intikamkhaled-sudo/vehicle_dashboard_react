export function calculateStatistics(data) {

    if (!data || data.length === 0)
        return null;

    const avg = key =>
        data.reduce((s, d) => s + (d[key] || 0), 0) / data.length;

    const max = key =>
        Math.max(...data.map(d => d[key] || 0));

    const min = key =>
        Math.min(...data.map(d => d[key] || 0));

    return {

        speed: {
            avg: avg("speed").toFixed(1),
            max: max("speed"),
            min: min("speed")
        },

        rpm: {
            avg: avg("rpm").toFixed(0),
            max: max("rpm"),
            min: min("rpm")
        },

        fuel: {
            avg: avg("fuel").toFixed(1),
            max: max("fuel"),
            min: min("fuel")
        },

        temperature: {
            avg: avg("temperature").toFixed(1),
            max: max("temperature"),
            min: min("temperature")
        }

    };

}