import {apiClient} from './client';

//Api endPoints
const endPoint = {
  createOrder: '/create-order',
  doneDeliveryOrder: '/done-delivery',
  donePendingOrder: '/done-pickup',
  getCategoryProduct: '/getCategoryProduct/1',
  getDashboardData: '/get/dashboard',
  getOrdersList: '/get/orders/list',
  getOrderCategory: '/get/OrderCategory',
  getOrderDetailsById: '/get/order-detail',
  getOrderDetailsByOrderId: '/get/order-detailById',
  getUserByMobile: '/get/user',
  updateDeliveredOrder: '/edit-order',
  getRateList: '/getCategoryProduct',
  getSofaBoyPickups: 'get/Sofaorders/list',
};

//Call Api Function

const createOrder = saveOrderObject => {
  return apiClient.post(endPoint.createOrder, saveOrderObject);
};

const getDashboardData = EmployeeID => {
  return apiClient.get(endPoint.getDashboardData + '/' + EmployeeID);
};

const doneDeliveryOrder = orderId => {
  console.log('Delivery Done : ' + orderId);
  return apiClient.get(endPoint.doneDeliveryOrder + '/' + orderId);
};

const donePendingOrder = orderId => {
  return apiClient.get(endPoint.donePendingOrder + '/' + orderId);
};

const getCategoryProduct = () => {
  return apiClient.get(endPoint.getCategoryProduct);
};

const getDeliveredOrdersList = EmployeeID => {
  return apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/2');
};

const getOrderDetailsById = orderId => {
  return apiClient.get(endPoint.getOrderDetailsById + '/' + orderId);
};

const getOrderDetailsByOrderId = orderId => {
  //  +'/' + orderId;
  return apiClient.get(endPoint.getOrderDetailsByOrderId + '/' + orderId);
};

const getOrderCategory = () => {
  return apiClient.get(endPoint.getOrderCategory);
};

const getPendingOrdersList = EmployeeID => {
  return apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/1');
};

const getRateList = categoryId => {
  return apiClient.get(endPoint.getRateList + '/' + categoryId);
};

const getSofaBoyPickups = EmployeeID => {
  return apiClient.get(endPoint.getSofaBoyPickups + '/' + EmployeeID);
};

const getUserByMobile = mobileNumber => {
  return apiClient.get(endPoint.getUserByMobile + '/' + mobileNumber);
};

const updateDeliveredOrder = jsonData => {
  return apiClient.post(endPoint.updateDeliveredOrder, jsonData);
};

//Export Functions
export default {
  createOrder,
  doneDeliveryOrder,
  donePendingOrder,
  getDashboardData,
  getDeliveredOrdersList,
  getCategoryProduct,
  getOrderCategory,
  getOrderDetailsById,
  getOrderDetailsByOrderId,
  getPendingOrdersList,
  getRateList,
  getSofaBoyPickups,
  getUserByMobile,
  updateDeliveredOrder,
};
