import {apiClient} from './client';

//Api endPoints
const endPoint = {
  getDashboardData: '/get/dashboard',
  getOrdersList: '/get/orders/list',
  getCategoryProduct: '/getCategoryProduct/1',
  donePendingOrder: '/done-pickup',
  doneDeliveryOrder: 'done-delivery',
};

//Call Api Function
const getDashboardData = EmployeeID => {
  return apiClient.get(endPoint.getDashboardData + '/' + EmployeeID);
};

const getPendingOrdersList = EmployeeID => {
  return apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/1');
};

const getDeliveredOrdersList = EmployeeID => {
  return apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/2');
};

const getCategoryProduct = () => {
  return apiClient.get(endPoint.getCategoryProduct);
};

const donePendingOrder = orderId => {
  return apiClient.get(endPoint.donePendingOrder + '/' + orderId);
};

const doneDeliveryOrder = orderId => {
  return apiClient.get(endPoint.doneDeliveryOrder + '/' + orderId);
};

//Export Functions
export default {
  getDashboardData,
  getDeliveredOrdersList,
  getPendingOrdersList,
  getCategoryProduct,
  donePendingOrder,
  doneDeliveryOrder,
};
