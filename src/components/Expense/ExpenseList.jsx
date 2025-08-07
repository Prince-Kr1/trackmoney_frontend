import moment from 'moment'
import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseList = ({transactions, onDelete, onEdit}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expense Sources</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((expense) => (
                <TransactionInfoCard 
                    key={expense.id}
                    title={expense.title}
                    category={expense.category}
                    amount={expense.amount}
                    date={moment(expense.date).format("Do MMM YYYY")}
                    type="expense"
                    onDelete={() => onDelete(expense.id)}
                    onEdit={() => onEdit(expense)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList