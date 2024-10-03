import axios from "axios";
import BackendApi from "./BackendApi";

const Teachers = async () => {
  try {
    const response = await axios.get(`${BackendApi}/allTeacher`); // Replace with your actual API endpoint
    console.log("Fetched staff data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff data", error);
    return [];
  }
};

export default Teachers;
