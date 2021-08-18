import {apiClient} from './client';

//Api endPoints
const endPoint = {
  getDashboardData: '/get/dashboard',
  getOrdersList: '/get/orders/list',
  getCategoryProduct: '/getCategoryProduct/1',
  donePendingOrder: '/done-pickup',
  doneDeliveryOrder: '/done-delivery',
  getOrderDetailsById: '/get/order-detail',
  updateDeliveredOrder: '/edit-order',
  getUserByMobile: '/get/user',
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

const getOrderDetailsById = orderId => {
  return apiClient.get(endPoint.getOrderDetailsById + '/' + orderId);
};

const updateDeliveredOrder = jsonData => {
  return apiClient.post(endPoint.updateDeliveredOrder, jsonData);
};

const getUserByMobile = mobileNumber => {
  return apiClient.get(endPoint.getUserByMobile + '/' + mobileNumber);
};

//Export Functions
export default {
  getDashboardData,
  getDeliveredOrdersList,
  getPendingOrdersList,
  getCategoryProduct,
  donePendingOrder,
  doneDeliveryOrder,
  getOrderDetailsById,
  updateDeliveredOrder,
  getUserByMobile,
};
