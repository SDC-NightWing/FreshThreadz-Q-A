import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 50,
  duration: '30s',
};
export default function () {
  //http.get('http://test.k6.io');
    http.get(`http://localhost:3000/qa/questions?product_id=3&page=1&count=3`);
    http.get(`http://localhost:3000/qa/questions/1/answers?page=1&count=4`);
  sleep(1);
}