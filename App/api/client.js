import {create} from 'apisauce';
import cache from '../utils/cache';

// define the api
const apiClient = create({
  baseURL: 'https://cleanfold.in/backend/clean_fold/public/api',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient};
