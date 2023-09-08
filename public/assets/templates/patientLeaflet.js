
import { BASE_URL } from "../utils/applicationConstants.js";

const fetchAllPatientLeaflets = async () => {

    const response = await fetch(`${BASE_URL}/case/1000/1`);
    const data = await response.json();
    const blogData = data.data;

};

fetchAllPatientLeaflets();