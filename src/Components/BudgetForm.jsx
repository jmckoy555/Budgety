import React, { useState } from 'react';

function BudgetForm() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [leftover, setLeftover] = useState(0);


  const calculateBudget = () => {
    const sumExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(sumExpenses);
    setLeftover(income - sumExpenses);
    setShowResults(true);
  };

  const handleIncomeChange = (event) => {
    setNewIncomeAmount(event.target.value); 
  };

  const handleExpenseAmountChange = (event) => {
    setNewExpenseAmount(event.target.value);
  };

  const handleExpenseDescriptionChange = (event) => {
    setNewExpenseDescription(event.target.value);
  };

  const setNewIncome = (event) => {
    event.preventDefault();
    setIncome(parseFloat(newIncomeAmount));
    setNewIncomeAmount(''); // Clear input field
  };

  const addExpense = (event) => {
    event.preventDefault();
    const amount = parseFloat(event.target.expenseAmount.value);
    const expenseItem = { amount, description: newExpenseDescription };
    setExpenses([...expenses, expenseItem]);
    setNewExpenseAmount(''); 
    setNewExpenseDescription(''); 
  };

  const resetBudget = () => {
    setIncome(0);
    setExpenses([]);
    setNewIncomeAmount('');
    setNewExpenseAmount('');
    setNewExpenseDescription('');
    setTotalExpenses(0);
    setLeftover(0);
    setShowResults(false); 
  };

  return (
    <div className='contain-all'>
        <div className='income'>
            <div className="income-title">
            <h2>Set Your Income</h2>
            <div className="form-container">
            <form onSubmit={setNewIncome}>
            <input name="newIncome" value={newIncomeAmount} onChange={handleIncomeChange} className='input-value' />
            <button className='sub-button' type="submit">Set Income</button>
            </form>
            </div> 
            </div>
        </div>
    
    <div className='expense'>
    <h2 className='ex-text'>Add Expenses</h2>
    <div className="ex-form">
    <form onSubmit={addExpense}>
        <input 
          name="expenseAmount" 
          value={newExpenseAmount} 
          onChange={handleExpenseAmountChange} 
          placeholder="Amount" 
          className='amount'
        />
        <input
          type="text"
          name="expenseDescription"
          value={newExpenseDescription}
          onChange={handleExpenseDescriptionChange}
          placeholder="Description"
          className='desc'
        />
        <button className='sub-button' type="submit">Add Expense</button>
      </form>
    </div>
    </div>
    <div className="income-container">
    <div className="income-tally">
      <h2>Income Tally</h2>
        <ul>
          <li>Initial Income: ${income}</li> 
        </ul>
      </div>
    </div>
      <div className="running-tally"> 
      <div className="expense-tally">
      <h2>Expense Tally</h2>
        <ul>
            {expenses.map((expense, index) => (
            <li key={index}>
            ${expense.amount} - {expense.description} 
            </li>
             ))}
        </ul>
      </div>
        
      </div>
    <div className='budget-button'>
     <button className='sub-button' onClick={calculateBudget}>Calculate Budget</button>  
     <button className='sub-button' onClick={resetBudget}>Reset</button>   
    </div>
     <div className='results'>
     {showResults && (
        <div className="budget-results">
          <p>Total Expenses: ${totalExpenses}</p>
          <p>Leftover: ${leftover}</p>
        </div>
      )}
     </div>    
    </div>
  );
}

export default BudgetForm;
