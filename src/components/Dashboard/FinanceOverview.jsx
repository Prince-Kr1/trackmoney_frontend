import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

// const COLORS = ["#10B981", "#FA2C37", "#FF6900"];
const COLORS = ["#875cf5", "#FA2C37", "#00bc7d"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expense", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},
    ];

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>

        <CustomPieChart 
            data={balanceData}
            label="Total Balance"
            totalAmount={`\u20B9 ${Number(totalBalance).toLocaleString('en-IN')}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview