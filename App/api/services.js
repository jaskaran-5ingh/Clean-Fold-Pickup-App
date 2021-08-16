import {apiClient} from './client';

//Api endPoints
const endPoint = {
  getDashboardData: '/get/dashboard',
  getOrdersList: '/get/orders/list/',
  getCategoryProduct: '/getCategoryProduct/1',
};

//Call Api Function
const getDashboardData = EmployeeID => {
  return apiClient.get(endPoint.getDashboardData + '/' + EmployeeID);
};

const getPendingOrdersList = (EmployeeID = 2214) => {
  return apiClient.get(endPoint.getOrdersList.EmployeeID + '/1');
};

const getDeliveredOrdersList = (EmployeeID = 2214) => {
  return apiClient.get(endPoint.getOrdersList.EmployeeID + '/2');
};

const getCategoryProduct = () => {
  return apiClient.get(endPoint.getCategoryProduct);
};

//Export Functions
export default {
  getDashboardData,
  getDeliveredOrdersList,
  getPendingOrdersList,
  getCategoryProduct,
};
