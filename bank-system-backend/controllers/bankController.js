// controllers/bankController.js
const db = require('../db');

// Calculate interest and EMI
function calculateLoanDetails(P, N, R) {
  const interest = (P * N * R) / 100;
  const total = P + interest;
  const monthly_emi = Math.ceil(total / (N * 12));
  return { interest, total, monthly_emi };
}

exports.lendLoan = (req, res) => {
  const { customer_id, loan_amount, loan_period, rate } = req.body;

  const principal = parseFloat(loan_amount);
  const years = parseInt(loan_period);
  const interestRate = parseFloat(rate);

  const { interest, total, monthly_emi } = calculateLoanDetails(principal, years, interestRate);


  db.run(`INSERT INTO loans (customer_id, principal, years, rate, interest, total_amount, monthly_emi)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [customer_id, principal, years, interestRate, interest, total, monthly_emi],

    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        loan_id: this.lastID,
        total_amount: total,
        monthly_emi
      });
    });
};

exports.makePayment = (req, res) => {
  const { loan_id, amount, type } = req.body;

  db.get(`SELECT * FROM loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: 'Loan not found' });

    console.log("Raw loan.amount_paid:", loan.amount_paid, typeof loan.amount_paid);
console.log("Raw amount from user:", amount, typeof amount);


    const newPaid = parseFloat(loan.amount_paid) + parseFloat(amount);



    db.run(`UPDATE loans SET amount_paid = ? WHERE loan_id = ?`, [newPaid, loan_id]);
    db.run(`INSERT INTO transactions (loan_id, type, amount) VALUES (?, ?, ?)`,
      [loan_id, type, amount]);

    res.json({ message: 'Payment successful', amount_paid: newPaid });
  });
};

exports.getLedger = (req, res) => {
  const { loanId } = req.params;

  db.all(`SELECT * FROM transactions WHERE loan_id = ? ORDER BY date`, [loanId], (err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT * FROM loans WHERE loan_id = ?`, [loanId], (err, loan) => {
      if (err || !loan) return res.status(404).json({ error: 'Loan not found' });

      const balance = loan.total_amount - loan.amount_paid;
      const emis_left = Math.ceil(balance / loan.monthly_emi);

      res.json({
        transactions,
        balance,
        monthly_emi: loan.monthly_emi,
        emis_left
      });
    });
  });
};

exports.getAccountOverview = (req, res) => {
  const { customerId } = req.params;

  db.all(`SELECT * FROM loans WHERE customer_id = ?`, [customerId], (err, loans) => {
    if (err) return res.status(500).json({ error: err.message });

    const overview = loans.map(loan => {
      const emis_left = Math.ceil((loan.total_amount - loan.amount_paid) / loan.monthly_emi);
      return {
        loan_id: loan.loan_id,
        principal: loan.principal,
        total_amount: loan.total_amount,
        emi: loan.monthly_emi,
        interest: loan.interest,
        amount_paid: loan.amount_paid,
        emis_left
      };
    });

    res.json(overview);
  });
};
