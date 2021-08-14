import {apiClient} from './client';

//Api endPoints
const endPoint = {
  login: '/loginEmp',
  signUp: '?action_name=signUp',
  forgotPassword: '?action_name=forgotPassword',
  updatePlayerId: '?action_name=updatePlayerId',
};

//Call Api Function
const signIn = async ({email, password}) => {
  return await apiClient.post(endPoint.login, {
    mobile_email: email,
    password: password,
  });
};

const signUp = async ({username, mobile, email, password}) => {
  return await apiClient.post(endPoint.signUp, {
    username,
    mobile,
    email,
    password,
  });
};

const forgotPassword = async ({email}) => {
  return await apiClient.post(endPoint.forgotPassword, {email});
};

const updatePlayerId = async ({id, player_id}) => {
  return await apiClient.post(endPoint.updatePlayerId, {id, player_id});
};

//Export Functions
export default {
  signIn,
  signUp,
  forgotPassword,
  updatePlayerId,
};
