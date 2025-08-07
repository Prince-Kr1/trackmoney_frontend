import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong while fetching expenses.", error);
    } finally {
      setLoading(false);
    }
  };

  // Add or Edit Expense
  const handleAddExpense = async (expense) => {
    const { title, category, amount, date } = expense;

    // Validation
    if (!title.trim()) return toast.error("Title is required.");
    if (!category.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a number > 0.");
    if (!date) return toast.error("Date is required.");

    try {
      if (editExpenseData) {
        // Edit expense
        const response = await axiosInstance.put(
          API_PATHS.EXPENSE.UPDATE_EXPENSE(editExpenseData.id),
          expense
        );
        if (response.data) {
          toast.success("Expense updated successfully");
        }
      } else {
        // Add expense
        const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
        if (response.data) {
          toast.success("Expense added successfully");
        }
      }

      setOpenAddExpenseModal(false);
      setEditExpenseData(null);
      fetchExpenseDetails();
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to save expense.");
      toast.error(error.response?.data?.message || "Failed to save expense.");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense.");
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => {
              setOpenAddExpenseModal(true);
              setEditExpenseData(null);
            }}
          />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onEdit={(expense) => {
            setEditExpenseData(expense);
            setOpenAddExpenseModal(true);
          }}
        />

        {/* Add/Edit Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => {
            setOpenAddExpenseModal(false);
            setEditExpenseData(null);
          }}
          title={editExpenseData ? "Edit Expense" : "Add Expense"}
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            initialData={editExpenseData}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
