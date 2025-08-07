import React, { useEffect, useState } from 'react'
import Input from '../Inputs/Input'

const AddIncomeForm = ({onAddIncome, initialData }) => {

    const [income, setIncome] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    // Fill values if in edit mode
    useEffect(() => {
        if (initialData) {
            setIncome({
                title: initialData.title || "",
                category: initialData.category || "",
                amount: initialData.amount || "",
                date: initialData.date?.slice(0, 10) || "",
            });
        }
  }, [initialData]);

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value });
    }

  return (
    <div>
        <Input 
            value={income.title}
            onChange={({ target }) => handleChange("title", target.value)}
            label="Title"
            placeholder="Enter Income Title"
            type="text"
        />
        <Input 
            value={income.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Category"
            placeholder="Enter Income Category"
            type="text"
        />
        <Input 
            value={income.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="Enter Amount"
            type="number"
        />
        <Input 
            value={income.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            placeholder="Enter Date"
            type="date"
        />

        <div className="flex justify-end mt-6">
            <button 
                type="button"
                className="add-btn add-btn-fill"
                onClick={() => onAddIncome(income)}
            >
                {initialData ? "Update Income" : "Add Income"}
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm