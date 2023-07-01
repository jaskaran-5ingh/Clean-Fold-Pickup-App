<<<<<<< HEAD
import {create, CancelToken} from 'apisauce';

const source = CancelToken.source()
=======
import { create } from 'apisauce';
>>>>>>> 7f9d0fa780949cae4b27befca36d31dd48bf82b1

//const BASE_URL = 'https://cleanfold.ripungupta.com/public/api';
const BASE_URL = 'https://www.abisyscorp.com/apps/apis/public/api';
//const BASE_URL = 'https://cleanfold.in/backend/clean_fold/public/api';
// define the api
const apiClient = create({
<<<<<<< HEAD
  baseURL: 'https://cleanfold.ripungupta.com/public/api',
=======
  baseURL: BASE_URL,
>>>>>>> 7f9d0fa780949cae4b27befca36d31dd48bf82b1
  headers: {
    Authorization:
      'Bearer $2y$10$5OmYFG9clk67v8g2VO.YXOwSqVyX9MzPdtXhyQ4lHVjdpm62wuLMK',
  },
});

<<<<<<< HEAD
export {apiClient, source};
=======
export { apiClient, BASE_URL };

>>>>>>> 7f9d0fa780949cae4b27befca36d31dd48bf82b1
