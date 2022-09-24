# Fresh Threadz Ecommerce Questions & Answers Microservice
Fresh threadz ecoomerce Q&A microservice was deployed with AWS EC2 instances. It used 2 t2 micro host servers, 1 mySQL database, and 1 nginx load-balancer. It supported a throughput of 2K+ RPS across eight endpoints with 120ms latency and 0% error rate. 

## Details 

### 1. Database selection 
- The Q&A data consists of questions, answers and answer photos.  
- MySQL was chosen because the data of Q&A is very relationally structured and the schemas are simple and unlikley to be changed. As the Q&A microservice is heavy on both write and read.
- Benchmarking databases. MongoDB vs. MySQL performance for a simple SELECT (read) query without indexing.
- Simple read request query from products table:

![image](https://user-images.githubusercontent.com/94769046/192112556-de1dfb9f-ac60-4b3d-a4bc-b2bd6df82216.png)
![image](https://user-images.githubusercontent.com/94769046/192112569-280d606d-072c-43cc-a1f7-4baa76e9c76e.png)
