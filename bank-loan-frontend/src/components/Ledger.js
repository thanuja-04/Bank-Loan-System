import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Ledger.css'; // Import CSS

function Ledger() {
  const [loanId, setLoanId] = useState('');
  const [ledger, setLedger] = useState(null);

  const fetchLedger = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ledger/${loanId}`);
      setLedger(res.data);
    } catch (err) {
      alert('Error fetching ledger');
    }
  };

  return (
    <div className="ledger-container">
      <h2 className="ledger-title">📒 Loan Ledger</h2>

      <div className="ledger-form">
        <input
          className="ledger-input"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={e => setLoanId(e.target.value)}
        />
        <button className="ledger-button" onClick={fetchLedger}>Fetch Ledger</button>
      </div>

      {ledger && (
        <div className="ledger-details">
          <p><strong>Balance:</strong> ₹{ledger.balance}</p>
          <p><strong>Monthly EMI:</strong> ₹{ledger.monthly_emi}</p>
          <p><strong>EMIs Left:</strong> {ledger.emis_left}</p>
          <h4>💰 Transactions:</h4>
          <ul className="ledger-list">
            {ledger.transactions.map((tx, i) => (
              <li key={i} className="ledger-item">
                {tx.type}: ₹{tx.amount} on {tx.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Ledger;
