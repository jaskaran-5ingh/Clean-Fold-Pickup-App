import {apiClient} from './client';

//Api endPoints
const endPoint = {
  getDashboardData: '/get/dashboard',
  getOrdersList: '/get/orders/list/2214/2',
  getCategoryProduct: '/getCategoryProduct/1',
};

//Call Api Function
const getDashboardData = EmployeeID => {
  return apiClient.get(endPoint.getDashboardData + '/' + EmployeeID);
};

const getOrdersList = () => {
  return apiClient.get(endPoint.getOrdersList);
};

const getCategoryProduct = () => {
  return apiClient.get(endPoint.getCategoryProduct);
};

//Export Functions
export default {
  getDashboardData,
  getOrdersList,
  getCategoryProduct,
};
