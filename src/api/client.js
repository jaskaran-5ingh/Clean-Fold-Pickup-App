import { create } from 'apisauce';

const BASE_URL = 'https://www.abisyscorp.com/apps/api/public/api';
//const BASE_URL = 'https://cleanfold.in/backend/clean_fold/public/api';
// define the api
const apiClient = create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      'Bearer $2y$10$5OmYFG9clk67v8g2VO.YXOwSqVyX9MzPdtXhyQ4lHVjdpm62wuLMK',
  },
});

export { apiClient, BASE_URL };

