// Base URL reads VITE_API_BASE or falls back to localhost
export const BASE_URL = import.meta.env.VITE_API_BASE;

export const API_PATHS = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup"
    },
    
    DASHBOARD: {
        GET_STATS: "/stats",
        GET_STATS_CHART: "/stats/chart",
    },

    INCOME: {
        ADD_INCOME: "/income",
        GET_ALL_INCOME: "/income/my",
        DELETE_INCOME: (incomeId) => `/income/${incomeId}`,
        UPDATE_INCOME: (incomeId) => `/income/${incomeId}`,
    },

     EXPENSE: {
        ADD_EXPENSE: "/expense",
        GET_ALL_EXPENSE: "/expense/my",
        DELETE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
        UPDATE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
    },

}