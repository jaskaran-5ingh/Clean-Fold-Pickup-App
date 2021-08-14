import {apiClient} from './client';

//Api endPoints
const endPoint = {
  successAlerts: '?action_name=appSuccessAlerts',
};

//Call Api Function
const getAlerts = () => {
  return apiClient.get(endPoint.successAlerts);
};



//Export Functions
export default {
  getAlerts,
};
