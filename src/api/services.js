import { apiClient } from './client';

//Api endPoints
const endPoint = {
  createBill: '/create-bill',
  createOrder: '/create-order',
  doneDeliveryOrder: '/done-delivery',
  getEmployeeDetails: '/get-employee-by-id',
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
  setDeviceNotificationToken: 'update-device-token',
  getSofaBoyPickups: 'get/Sofaorders/list',
};

//Call Api Function

const createBill = saveBillObject =>
  apiClient.post(endPoint.createBill, saveBillObject);

const createOrder = saveOrderObject =>
  apiClient.post(endPoint.createOrder, saveOrderObject);

const getDashboardData = EmployeeID =>
  apiClient.get(endPoint.getDashboardData + '/' + EmployeeID);

const doneDeliveryOrder = orderId =>
  apiClient.get(endPoint.doneDeliveryOrder + '/' + orderId);

const donePendingOrder = orderId =>
  apiClient.get(endPoint.donePendingOrder + '/' + orderId);

const getCategoryProduct = () => apiClient.get(endPoint.getCategoryProduct);

const getDeliveredOrdersList = EmployeeID =>
  apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/2');

const getEmployeeDetails = id =>
  apiClient.get(endPoint.getEmployeeDetails + '/' + id);

const getOrderDetailsById = orderId =>
  apiClient.get(endPoint.getOrderDetailsById + '/' + orderId);

const getOrderDetailsByOrderId = orderId =>
  apiClient.get(endPoint.getOrderDetailsByOrderId + '/' + orderId);

const getOrderCategory = () => apiClient.get(endPoint.getOrderCategory);

const getPendingOrdersList = EmployeeID =>
  apiClient.get(endPoint.getOrdersList + '/' + EmployeeID + '/1');

const getRateList = categoryId =>
  apiClient.get(endPoint.getRateList + '/' + categoryId);

const getSofaBoyPickups = EmployeeID =>
  apiClient.get(endPoint.getSofaBoyPickups + '/' + EmployeeID);

const getUserByMobile = mobileNumber =>
  apiClient.get(endPoint.getUserByMobile + '/' + mobileNumber);

const setDeviceNotificationToken = postData =>
  apiClient.post(endPoint.setDeviceNotificationToken, postData);

const updateDeliveredOrder = jsonData =>
  apiClient.post(endPoint.updateDeliveredOrder, jsonData);

//Export Functions
export default {
  createBill,
  createOrder,
  doneDeliveryOrder,
  getEmployeeDetails,
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
  setDeviceNotificationToken,
  updateDeliveredOrder,
};
