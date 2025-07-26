import React, { useState } from 'react';
import axios from 'axios';
import '../styles//Overview.css';

function Overview() {
  const [customerId, setCustomerId] = useState('');
  const [loans, setLoans] = useState([]);

  const fetchOverview = async () => {
    try {
      const res = await axios.get(`https://bank-system-backend-3esp.onrender.com/api/overview/${customerId}`);
      setLoans(res.data);
    } catch (err) {
      alert('Failed to fetch overview');
    }
  };

  return (
    <div className="overview-container">
      <h2>Account Overview</h2>
      <div className="overview-form">
        <input
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
        />
        <button onClick={fetchOverview}>Fetch</button>
      </div>

      {loans.length > 0 && (
        <table className="overview-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Total</th>
              <th>Paid</th>
              <th>EMI</th>
              <th>Left</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={i}>
                <td>{loan.loan_id}</td>
                <td>₹{loan.principal}</td>
                <td>{loan.interest}%</td>
                <td>₹{loan.total_amount}</td>
                <td>₹{loan.amount_paid}</td>
                <td>₹{loan.emi}</td>
                <td>{loan.emis_left}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Overview;
