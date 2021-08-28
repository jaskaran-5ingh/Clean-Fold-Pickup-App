import {apiClient} from './client';

//Api endPoints
const endPoint = {
  login: '/loginEmp',
};

//Call Api Function
const signIn = async ({email, password}) =>
  await apiClient.post(endPoint.login, {
    mobile_email: email,
    password: password,
  });

//Export Functions
export default {
  signIn,
};
