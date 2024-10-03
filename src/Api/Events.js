import axios from "axios";
import BackendApi from "./BackendApi";

const Events = async () => {
  try {
    const response = await axios.get(`${BackendApi}/allEvent`); // Replace with your actual API endpoint
    console.log("Fetched events data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students data", error);
    return [];
  }
};

export default Events;
