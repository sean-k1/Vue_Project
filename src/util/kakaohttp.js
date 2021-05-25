import { KaKao_API_KEY } from "../views/Maps/API_KEY.js";
import axios from 'axios';
 // axios 객체 생성
 export default axios.create({
   baseURL: 'https://dapi.kakao.com/v2/local/search/',
   headers: {
     'Content-type': 'application/json',
      'Authorization': `KakaoAK ${KaKao_API_KEY}`     //  'Authorization': `KakaoAK ${searchKey}`,
   },
 });
 