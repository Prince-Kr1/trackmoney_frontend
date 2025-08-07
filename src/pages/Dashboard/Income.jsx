import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import toast from 'react-hot-toast'
import IncomeOverview from '../../components/Income/IncomeOverview'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import Modal from '../../components/Modal'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [editIncomeData, setEditIncomeData] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  // Fetch all incomes
  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch income data", error)
    } finally {
      setLoading(false)
    }
  }

  // Add or Edit Income
  const handleAddIncome = async (income) => {
    const { title, category, amount, date } = income;

    // Validation
    if (!title.trim()) return toast.error("Title is required.")
    if (!category.trim()) return toast.error("Category is required.")
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a number > 0.")
    if (!date) return toast.error("Date is required.")

    try {
      if (editIncomeData) {
        // Edit income
        const response = await axiosInstance.put(
          API_PATHS.INCOME.UPDATE_INCOME(editIncomeData.id),
          income
        )
        if (response.data) {
          toast.success("Income updated successfully")
        }
      } else {
        // Add income
        const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income)
        if (response.data) {
          toast.success("Income added successfully")
        }
      }

      setOpenAddIncomeModal(false)
      setEditIncomeData(null)
      fetchIncomeDetails()
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to save income.")
      toast.error(error.response?.data?.message || "Failed to save income.")
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Income deleted successfully")
      fetchIncomeDetails()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income.")
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, [])

  return (
    <DashboardLayout>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onExpenseIncome={() => {
              setOpenAddIncomeModal(true);
              setEditIncomeData(null);
            }}
          />
        </div>

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onEdit={(income) => {
            setEditIncomeData(income);
            setOpenAddIncomeModal(true);
          }}
        />

        {/* Add/Edit Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => {
            setOpenAddIncomeModal(false);
            setEditIncomeData(null);
          }}
          title={editIncomeData ? "Edit Income" : "Add Income"}
        >
          <AddIncomeForm 
            onAddIncome={handleAddIncome} 
            initialData={editIncomeData} 
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
