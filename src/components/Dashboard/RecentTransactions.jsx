import moment from 'moment/moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Recent Transactions</h5>

            {/* <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
            </button> */}
        </div>

        <div className="mt-6">
            {transactions?.length > 0 ? (
                transactions.slice(0, 5).map((item, index) => (
                <TransactionInfoCard
                    key={item.id || index}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
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

export default RecentTransactions