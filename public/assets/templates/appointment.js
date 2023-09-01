
import { BASE_URL } from "../utils/applicationConstants.js";

const fetchAllClinicData = async () => {
    const response  = await fetch(`${BASE_URL}/clinic/`);
    const data = await response.json();
  
    console.log(data);
  };
  
  
  fetchAllClinicData();