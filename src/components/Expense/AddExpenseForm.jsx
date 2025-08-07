import React, { useEffect, useState } from 'react'
import Input from '../Inputs/Input';

const AddExpenseForm = ({onAddExpense, initialData}) => {

    const [expense, setExpense] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    // Fill values if in edit mode
    useEffect(() => {
        if (initialData) {
            setExpense({
                title: initialData.title || "",
                category: initialData.category || "",
                amount: initialData.amount || "",
                date: initialData.date?.slice(0, 10) || "", // ensure format: YYYY-MM-DD
            })
        }
    }, [initialData]);
    
    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value });
    };

  return (
    <div>
        <Input 
            value={expense.title}
            onChange={({ target }) => handleChange("title", target.value)}
            label="Title"
            placeholder="Enter Expense Title"
            type="text"
        />
        <Input 
            value={expense.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Category"
            placeholder="Enter Expense Category"
            type="text"
        />
        <Input 
            value={expense.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="Enter Amount"
            type="number"
        />
        <Input 
            value={expense.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            placeholder="Enter Date"
            type="date"
        />

        <div className="flex justify-end mt-6">
            <button 
                type="button"
                className="add-btn add-btn-fill"
                onClick={() => onAddExpense(expense)}
            >
                {initialData ? "Update Expense" : "Add Expense"}
            </button>
        </div>
    </div>
  );
};

export default AddExpenseForm;