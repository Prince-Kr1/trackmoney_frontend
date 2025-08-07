import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from 'react-icons/lu';

const TransactionInfoCard = ({title, date, amount, type, hideDeleteBtn, onDelete, onEdit}) => {
    
    const getAmountStyles = () => 
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
    

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
            {type === "income" ? (
                <LuTrendingUp className="w-6 h-6 text-green-500" />
            ) : (
                <LuTrendingDown className="w-6 h-6 text-red-500" />
            )}
        </div>

        <div className="flex-1 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-700 font-semibold">{title}</p>
                <p className="text-xs text-gray-400 mt-1">{date}</p>
            </div>
        </div>

        <div className="flex items-center gap-5">
            {!hideDeleteBtn && (
                <>
                    <button
                        onClick={onEdit}
                        className="text-gray-400 hover:text-primary opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Edit"
                    >
                        <LuPencil size={18} />
                    </button>

                    <button
                        onClick={onDelete}
                        className="text-gray-400 hover:text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        <LuTrash2 size={18}/>
                    </button>
                </>
            )}

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                <h6 className="text-xs font-semibold">
                    {type === "income" ? "+" : "-"} {"\u20B9"} {Number(amount).toLocaleString('en-IN')}
                </h6>
                {/* {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />} */}
            </div>
        </div>
    </div>
  )
}

export default TransactionInfoCard;