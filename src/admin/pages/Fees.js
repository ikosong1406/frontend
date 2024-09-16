import React, { useState } from "react";
import "../styles/Fees.css";

// Dummy backend data for fees
const initialFees = {
  tuition: 5000,
  library: 300,
  sports: 200,
  transportation: 500,
};

const Fees = () => {
  const [fees, setFees] = useState(initialFees);

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setFees({ ...fees, [name]: parseInt(value) });
  };

  const handleSave = () => {
    // Save the fees (for now, just log them)
    console.log("Updated Fees", fees);
    alert("Fees updated!");
  };

  return (
    <div className="fee-management-page">
      <h1>Fee Management</h1>
      <div className="fees-list">
        {Object.keys(fees).map((fee) => (
          <div className="fee-item" key={fee}>
            <label>{fee.charAt(0).toUpperCase() + fee.slice(1)} Fee:</label>
            <input
              type="number"
              name={fee}
              value={fees[fee]}
              onChange={handleFeeChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Fees;
