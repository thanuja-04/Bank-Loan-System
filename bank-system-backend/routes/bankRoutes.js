// routes/bankRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bankController');

// Routes
router.post('/lend', controller.lendLoan);
router.post('/payment', controller.makePayment);
router.get('/ledger/:loanId', controller.getLedger);
router.get('/overview/:customerId', controller.getAccountOverview);

module.exports = router;
