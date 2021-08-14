import {fyersApiClient} from './client';
import client from './client';
//Api endPoints
const endPoint = {
  getProfile: '/get_profile',
};

//Call Api Function
const getUserProfileDetails = () => {
  return client.fyersApiClient.get(endPoint.getProfile);
};

//Export Functions
export default {
  getUserProfileDetails,
};
