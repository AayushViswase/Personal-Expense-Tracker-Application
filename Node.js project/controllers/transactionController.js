const Transaction = require('../models/transactionModel');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    // Validate input data
    if (!type || !category || !amount || !date || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new transaction
    const newTransaction = new Transaction({
      type,
      category,
      amount,
      date,
      description,
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a specific transaction by ID
exports.updateTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    // Validate input data
    if (!type || !category || !amount || !date || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, category, amount, date, description },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific transaction by ID
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndRemove(req.params.id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(deletedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
