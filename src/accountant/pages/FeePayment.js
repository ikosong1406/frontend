import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import BackendApi from "../../Api/BackendApi";

const FeePayment = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [feeOptions, setFeeOptions] = useState([]);
  const [selectedFee, setSelectedFee] = useState("");
  //   const history = useHistory();

  useEffect(() => {
    // Fetch classes from the backend
    const fetchClasses = async () => {
      // Replace with your endpoint to fetch classes
      const response = await axios.get(`${BackendApi}/classes`);
      setClasses(response.data);
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      // Fetch students based on the selected class
      const fetchStudents = async () => {
        const response = await axios.get(
          `${BackendApi}/students/${selectedClass}`
        );
        setStudents(response.data);
      };

      fetchStudents();
    }
  }, [selectedClass]);

  useEffect(() => {
    // Set fee options here. This can be fetched from the backend if dynamic.
    const options = [
      { name: "Tuition Fee", amount: 5000 },
      { name: "Activity Fee", amount: 2000 },
      { name: "Miscellaneous Fee", amount: 1500 },
    ];
    setFeeOptions(options);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      session: "2024/2025",
      term: "First Term",
      studentId: selectedStudent,
      class: selectedClass,
      feePaid: selectedFee.name,
      amount: selectedFee.amount,
      date: new Date().toISOString().split("T")[0], // Current date
    };

    try {
      // Send the fee data to the backend
      await axios.post(`${BackendApi}/fees`, data);
      //   history.push("/fees-collection");
    } catch (error) {
      console.error("Error submitting fee data:", error);
    }
  };

  return (
    <div className="fee-payment-page">
      <h2>Fee Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fee:</label>
          <select
            value={selectedFee.name}
            onChange={(e) =>
              setSelectedFee(
                feeOptions.find((fee) => fee.name === e.target.value)
              )
            }
            required
          >
            <option value="">Select Fee</option>
            {feeOptions.map((fee) => (
              <option key={fee.name} value={fee.name}>
                {fee.name} - ${fee.amount}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default FeePayment;
