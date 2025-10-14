import axiosInstance from '../lib/axiosInstance';

export const getProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};
