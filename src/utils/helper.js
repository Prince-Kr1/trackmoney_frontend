import { format } from 'date-fns';
import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(d{3})+(?!\d))/g, ","); 

    return fractionalPart ? `${formattedInteger}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        month: format(new Date(item?.date), 'dd MMM'), // like "01 Jul"
        // category: item?.category,
        amount: Number(item?.amount),
    }));

    return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: Number(item?.amount),
        title: item?.title,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: Number(item?.amount),
        title: item?.title,
    }));

    return chartData;
}