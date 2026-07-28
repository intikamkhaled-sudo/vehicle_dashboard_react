const API_URL = "http://localhost:3000/api/telemetry";

export async function getTelemetry() {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("API Error");
    }

    const json = await response.json();

    return json.data || json;
}