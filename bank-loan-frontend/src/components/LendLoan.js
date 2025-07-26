// src/components/LendLoan.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LendLoan.css'; // <-- import the styles

function LendLoan() {
  const [form, setForm] = useState({
    customer_id: '',
    loan_amount: '',
    loan_period: '',
    rate: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/lend', form);
      setResponse(res.data);
      alert("Loan granted successfully.")
    } catch (error) {
      alert('❌ Failed to grant loan');
    }
  };

  return (
    <div className="lend-loan-container">
      <h2>Lend Loan</h2>
      <form onSubmit={handleSubmit}>
        <input name="customer_id" placeholder="Customer ID" onChange={handleChange} required />
        <input name="loan_amount" placeholder="Loan Amount" onChange={handleChange} required />
        <input name="loan_period" placeholder="Loan Period (in years)" onChange={handleChange} required />
        <input name="rate" placeholder="Interest Rate (%)" onChange={handleChange} required />
        <button type="submit">Lend Loan</button>
      </form>

      {response && (
        <div className="loan-response">
          <h4>✅ Loan Granted</h4>
          <p><strong>Loan ID:</strong> {response.loan_id}</p>
          <p><strong>Total Amount:</strong> ₹{response.total_amount}</p>
          <p><strong>Monthly EMI:</strong> ₹{response.monthly_emi}</p>
        </div>
      )}
    </div>
  );
}

export default LendLoan;
