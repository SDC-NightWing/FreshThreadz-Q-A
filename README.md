# Fresh Threadz Ecommerce Questions & Answers Microservice  
-  I worked with a group of 4 engineers together to rebuild the back-end system of an existing ecoomerce website to withstand higher traffic at about 2000 RPS with a response time of 150 ms.  
- I was responsible for Q&A section, which was created to rebuild the API, and construct a database and server layer of the Q&A section.
- Fresh threadz ecoomerce Q&A microservice was deployed with AWS EC2 instances. It used 2 t2 micro host servers, 1 mySQL database, and 1 nginx load-balancer. It supported a throughput of 2K+ RPS across eight endpoints with 120ms latency and 0% error rate. 

## Details 

### 1. Database selection 
- The Q&A data consists of questions, answers and answer photos.
![Screen Shot 2022-09-13 at 2 57 40 PM](https://user-images.githubusercontent.com/94769046/192113487-129af691-27db-435e-b9ea-ad9c9d3e1772.png)

- The schemas of the Q&A data are clear and unlikley to be changed. MySQL was chosen as the database.
- Benchmarking databases. MySQL performance for read/write queries with connection pooling and indexing.
#### @ 400 PEAK RPS - P95 6ms Response Time
![image](https://user-images.githubusercontent.com/94769046/192113079-52eaf6af-4add-4cd4-a4a5-0fbcec9ffa78.png)  
#### @ 1500 PEAK RPS - P95 9ms Response Time
![image](https://user-images.githubusercontent.com/94769046/192113111-5b5c5d90-86b4-410c-aa7b-8be9982f47cc.png)  

<hr>  

### 2. Deployement
- The MySQL DB and the initial server were deployed on AWS EC2 instance on US west region. 
- At a latency less than 140ms the single server can handle 1000 RPS throughput with 0% error rate.   
- The latency increased to 2800ms when the throughput increased to 2000 RPS which is unacceptable. 
#### @ 1000 AVG RPS - Average 135ms Response Time
![image7](https://user-images.githubusercontent.com/94769046/192114161-c82364b7-c332-4270-9c66-78acdda22fa3.png)
#### @ 2000 AVG RPS - Average 2794ms Response Time
![image3](https://user-images.githubusercontent.com/94769046/192114260-cf021ee4-f509-40d7-add3-2ab1026a8009.png)  

<hr>  

### 3. Implement Nginx Load Balancer with Round Robin algorithm around 2 host servers
- After adding a nginx load balancer and an additional t2 micro server, it was able to handle 2k throughput at a latency of 161ms with 0% error rate.  
#### @ 2000 AVG RPS - Average 161ms Response Time
![image6](https://user-images.githubusercontent.com/94769046/192114562-52a53bee-44eb-4942-868d-a31bcf0afe71.png)  

<hr>  

### 4. Add Caching to Nginx Load Balancer  
- Caching was added to the nginx load balancer. With caching, the servers were able to handle 2k throughput with 0% error rate with <125 latency  
#### @ 2000 AVG RPS - Average 125ms Response Time
![image2](https://user-images.githubusercontent.com/94769046/192114781-1ca57132-0975-4b56-a994-3cb31f0d735b.png)

<hr>  

### 5. Further Optimization  
- I would consider add more servers and test the performance at different throughput 
- Verticle scaling is another option for optimiaztion, t2 micros with the AWS Free Tier was chosen 
- Incorporate a in-memory database like Redis.
- SQL optimization is also an option to consider. I would be interested in exploring to make my query more efficient.  
-- Besides client side connection pooing, try thread pooling  
-- How to fully utilize indexing  
-- How to avoid full table scanning  
-- How to avoid queries for invalid data



<hr>  

### 6. Requirements
- See package.json file for details.

