# Fresh Threadz Ecommerce Questions & Answers Microservice
Fresh threadz ecoomerce Q&A microservice was deployed with AWS EC2 instances. It used 2 t2 micro host servers, 1 mySQL database, and 1 nginx load-balancer. It supported a throughput of 2K+ RPS across eight endpoints with 120ms latency and 0% error rate. 

## Details 

### 1. Database selection 
- The Q&A data consists of questions, answers and answer photos.  
![Screen Shot 2022-09-13 at 2 57 40 PM](https://user-images.githubusercontent.com/94769046/192113487-129af691-27db-435e-b9ea-ad9c9d3e1772.png)

- The data of Q&A is very relationally structured and the schemas are clear and unlikley to be changed. MySQL was chosen as the Q&A microservice is heavy on both write and read and fields like helpfulness and reported are constantly updated.
- Benchmarking databases. MySQL performance for read/write queries with pooling and indexing.
#### @ 400 PEAK RPS 
![image](https://user-images.githubusercontent.com/94769046/192113079-52eaf6af-4add-4cd4-a4a5-0fbcec9ffa78.png)  
#### @ 1500 PEAK RPS 
![image](https://user-images.githubusercontent.com/94769046/192113111-5b5c5d90-86b4-410c-aa7b-8be9982f47cc.png)  

<hr>  

### 2. Deployement 
- The MySQL DB and the initial server were deployed on AWS EC2 instance on US west region. 
- At a latency less than 140ms the single server can handle 1000 RPS throughput with 0% error rate.   
- The latency increased to 2800ms when the throughput increased to 2000 RPS which is unacceptable. 
#### @ 1000 AVG RPS 
![image7](https://user-images.githubusercontent.com/94769046/192114161-c82364b7-c332-4270-9c66-78acdda22fa3.png)
#### @ 2000 AVG RPS 
![image3](https://user-images.githubusercontent.com/94769046/192114260-cf021ee4-f509-40d7-add3-2ab1026a8009.png)  

<hr>  

### 3. Implement Nginx Load Balancer with Round Robin algorithm around 2 host servers
- After adding a nginx load balancer and an additional t2 micro server, it was able to handle 2k throughput at a latency of 161ms with 0% error rate.  
#### @ 2000 AVG RPS 
![image6](https://user-images.githubusercontent.com/94769046/192114562-52a53bee-44eb-4942-868d-a31bcf0afe71.png)  

<hr>  

### 4. Add Caching to Nginx Load Balancer  
- Caching was added to the nginx load balancer. With caching, the servers were able to handle 2k throughput with 0% error rate with <125 latency  
#### @ 2000 AVG RPS 
![image2](https://user-images.githubusercontent.com/94769046/192114781-1ca57132-0975-4b56-a994-3cb31f0d735b.png)

<hr>  

### 5. Further Optimization  
- I would consider add more servers and test the performance at different throughput 
- Verticle scaling is another option for optimiaztion, t2 micros with the AWS Free Tier was chosen 
- SQL optimization is also an option to consider. I would be interested in exploring to make my query more efficient.  
-- How to fully utilize indexing  
-- How to avoid full table scanning  
-- How to avoid queries for invalid data
