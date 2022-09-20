USE sdc;
DROP TABLE IF EXISTS answers;
CREATE TABLE IF NOT EXISTS answers
(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
question_id INTEGER NOT NULL,
body VARCHAR(255) NOT NULL,
date_written TIMESTAMP NOT NULL,
answerer_name VARCHAR(50) NOT NULL,
answerer_email VARCHAR(50) NOT NULL,
reported BOOLEAN DEFAULT 0,
helpful INTEGER DEFAULT 0,
FOREIGN KEY(question_id) REFERENCES questions(id)
);

-- LOAD DATA INFILE '/Users/qingzhouyan/hackreactor/SDC/Q&A/answers.csv'
LOAD DATA INFILE 'answers.csv'
INTO TABLE answers
fields terminated by ','
optionally enclosed by '"'
ignore 1 lines
(id, question_id, body, @var1, answerer_name, answerer_email, reported, helpful)
SET date_written = FROM_UNIXTIME(@var1/1000)
;

ALTER TABLE answers ADD INDEX question_id_reported_idx(question_id, reported);
-- mysql -u root < models/schemas/mysql/answers.sql