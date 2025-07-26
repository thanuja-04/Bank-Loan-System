import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LendLoan from './components/LendLoan';
import MakePayment from './components/MakePayment';
import Ledger from './components/Ledger';
import Overview from './components/Overview';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">💰 LoanXpert</div>
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <NavLink exact="true" to="/" activeclassname="active" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/lend" activeclassname="active" onClick={closeMenu}>Lend Loan</NavLink>
            <NavLink to="/pay" activeclassname="active" onClick={closeMenu}>Make Payment</NavLink>
            <NavLink to="/ledger" activeclassname="active" onClick={closeMenu}>Ledger</NavLink>
            <NavLink to="/overview" activeclassname="active" onClick={closeMenu}>Overview</NavLink>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lend" element={<LendLoan />} />
            <Route path="/pay" element={<MakePayment />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/overview" element={<Overview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
