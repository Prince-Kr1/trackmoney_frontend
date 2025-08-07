import axiosInstance from './axiosInstance';

export const fetchDashboardStats = async () => {
  const res = await axiosInstance.get('/stats/my');
  return res.data;
};
