import axios from 'axios';
import { apiClient, BASE_URL } from './client';
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
	sofaOrderDone: 'sofa-order-done'
};

//Call Api Function

const createBill = saveBillObject =>
  apiClient.post(endPoint.createBill, saveBillObject);

const createOrder = saveOrderObject =>
  apiClient.post(endPoint.createOrder, saveOrderObject);

  let cancelToken;
const getDashboardData = async (EmployeeID) => {


  //Check if there are any previous pending requests
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.")
  }

  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source()

  return axios.get(
    BASE_URL + endPoint.getDashboardData + '/' + EmployeeID,
    { cancelToken: cancelToken.token } //Pass the cancel token to the current request
  );

  // const newSource = CancelToken.source();
  // console.log(newSource);
  // let response = await apiClient.get(endPoint.getDashboardData + '/' + EmployeeID, { EmployeeID: EmployeeID }, { cancelToken: newSource.token });
  // newSource.cancel();
  // console.log(response);
  // return response;
}

const doneDeliveryOrder = orderId =>
  apiClient.get(endPoint.doneDeliveryOrder + '/' + orderId);

const sofaOrderDone = orderId =>
  apiClient.get(endPoint.sofaOrderDone + '/' + orderId);

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
  sofaOrderDone,
  updateDeliveredOrder,
};
