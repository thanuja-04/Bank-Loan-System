// src/components/MakePayment.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MakePayment.css'; // Import the styles

function MakePayment() {
  const [form, setForm] = useState({
    loan_id: '',
    amount: '',
    type: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/payment', form);
      setResponse(res.data);
      alert('✅ Payment Successful!');
    } catch (error) {
      alert('❌ Payment Failed!');
    }
  };

  return (
    <div className="make-payment-container">
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <input name="loan_id" placeholder="Loan ID" onChange={handleChange} required />
        <input name="amount" placeholder="Amount" onChange={handleChange} required />
        <input name="type" placeholder="Type (e.g., EMI)" onChange={handleChange} required />
        <button type="submit">Pay</button>
      </form>

      {response && (
        <div className="payment-response">
          <h4>💸 Payment Details</h4>
          <p><strong>Message:</strong> {response.message}</p>
          <p><strong>Total Amount Paid:</strong> ₹{response.amount_paid}</p>
        </div>
      )}
    </div>
  );
}

export default MakePayment;
