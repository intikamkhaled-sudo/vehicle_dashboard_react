import axios from "axios";

export async function getReplay(vehicleID){

    const res = await axios.get(

        `http://localhost:3000/api/replay/${vehicleID}`

    );

    return res.data;

}