const express = require('express');
const router = express.Router();
const cors = require('cors'); // Add this line
    

const transactionController = require('../controllers/transactionController');

// Define your API endpoints
router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
