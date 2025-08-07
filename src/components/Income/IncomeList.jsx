import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onEdit}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Income Sources</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((income) => (
                <TransactionInfoCard 
                    key={income.id}
                    title={income.title}
                    category={income.category}
                    amount={income.amount}
                    date={moment(income.date).format("Do MMM YYYY")}
                    type="income"
                    onDelete={() => onDelete(income.id)}
                    onEdit={() => onEdit(income)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList