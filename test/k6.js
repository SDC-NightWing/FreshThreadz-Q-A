import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 50 },
    { duration: '10s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<50'], // 95% of requests should be below 200ms
  },
};
export default function () {
  const eachEndpointCount = 5
  //test list questions endpoint
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 899999
    http.get(`http://localhost:3000/qa/questions?product_id=${id}&page=1&count=3`, {
      tags: { name: 'listQuestions' }
    });
  }

  // test list answers endpoint
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 3518960
    http.get(`http://localhost:3000/qa/questions/${id}/answers?page=1&count=4`, {
      tags: { name: 'listAnswers' }
    });
  }

  // test mark questions as helpful
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 3418960
    http.put(`http://localhost:3000/qa/questions/${id}/helpful`, null, {
      tags: { name: 'markQHelpful' }
    });
  }

  // test report questions
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 3418960
    http.put(`http://localhost:3000/qa/questions/${id}/report`, null, {
      tags: { name: 'reportQ' }
    });
  }


  // test mark answers helpful
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 6879300
    http.put(`http://localhost:3000/qa/answers/${id}/helpful`, null, {
      tags: { name: 'markAHelpful' }
    });
  }



  // test report questions
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 10000) + 6879300
    http.put(`http://localhost:3000/qa/questions/${id}/report`, null, {
      tags: { name: 'reportA' }
    });
  }

  // test post question
  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 100000) + 899999
    const url = 'http://localhost:3000/qa/questions';
    const payload = JSON.stringify({
      "body": "What a test question!",
      "name": "test",
      "email": "test@test.com",
      "product_id": id
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'postQuestions' }
    };

    http.post(url, payload, params);
  }

  // test post answer

  for (let i = 0; i < eachEndpointCount; i++) {
    let id = Math.floor(-Math.random() * 100000) + 3518960
    const url = `http://localhost:3000/qa/questions/${id}/answers`;
    const payload = JSON.stringify({
      "body": "Something pretty durable but I can't be sure",
      "name": "test",
      "email": "test@test.com",
      "photos": [
        "urlplaceholder/answer_5_photo_number_10.jpg",
        "urlplaceholder/answer_5_photo_number_11.jpg"
      ]
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'postAnswers' }
    };

    http.post(url, payload, params);
  }

  sleep(1)
}