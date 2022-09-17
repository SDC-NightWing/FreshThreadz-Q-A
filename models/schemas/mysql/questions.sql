USE sdc;
DROP TABLE IF EXISTS questions ;
CREATE TABLE IF NOT EXISTS questions
(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_id INTEGER NOT NULL,
body VARCHAR(255) NOT NULL,
date_written TIMESTAMP NOT NULL,
asker_name VARCHAR(50) NOT NULL,
asker_email VARCHAR(50) NOT NULL,
reported BOOLEAN DEFAULT 0,
helpful INTEGER DEFAULT 0
);

LOAD DATA INFILE '/Users/qingzhouyan/hackreactor/SDC/Q&A/questions.csv'
INTO TABLE questions
fields terminated by ','
optionally enclosed by '"'
ignore 1 lines
(id, product_id, body, @var1, asker_name, asker_email, reported, helpful)
SET date_written = FROM_UNIXTIME(@var1/1000)
;


-- mysql -u root < models/schemas/mysql/questions.sql