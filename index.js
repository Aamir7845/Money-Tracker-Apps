const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const expenseSchema = new mongoose.Schema({
  text: String,
  amount: Number,
});

const Expense = mongoose.model('Expense', expenseSchema);

// Get all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new expense
app.post('/expenses', async (req, res) => {
  try {
    const { text, amount } = req.body;
    const newExpense = new Expense({ text, amount });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
