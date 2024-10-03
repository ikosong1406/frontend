// fetchStudents.js

import axios from "axios";
import BackendApi from "./BackendApi";

const Student = async () => {
  try {
    const response = await axios.get(`${BackendApi}/allStudent`); // Replace with your actual API endpoint
    console.log("Fetched students data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students data", error);
    return [];
  }
};

export default Student;
