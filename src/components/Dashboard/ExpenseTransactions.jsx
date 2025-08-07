import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expenses</h5>

            <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.length > 0 ? (
                transactions.slice(0, 5).map((expense, index) => (
                <TransactionInfoCard
                    key={expense.id || index}
                    title={expense.title}
                    icon={expense.icon}
                    date={moment(expense.date).format("Do MMM YYYY")}
                    amount={expense.amount}
                    type={expense.type}
                    hideDeleteBtn={true}
                />
                ))
            ) : (
                <p className="text-muted-foreground text-sm">No recent transactions found.</p>
            )}
        </div>
    </div>
  )
}

export default ExpenseTransactions