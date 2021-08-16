import {create} from 'apisauce';
import cache from '../utils/cache';

// define the api
const apiClient = create({
  baseURL: 'https://cleanfold.in/backend/clean_fold/public/api',
  headers: {
    Authorization:
      'Bearer $2y$10$5OmYFG9clk67v8g2VO.YXOwSqVyX9MzPdtXhyQ4lHVjdpm62wuLMK',
  },
});

export {apiClient};