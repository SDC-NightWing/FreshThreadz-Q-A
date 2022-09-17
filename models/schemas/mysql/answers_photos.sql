USE sdc;
DROP TABLE IF EXISTS answers_photos;
CREATE TABLE IF NOT EXISTS answers_photos
(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
answer_id INTEGER NOT NULL,
url VARCHAR(255) NOT NULL,
FOREIGN KEY(answer_id) REFERENCES answers(id)
);

LOAD DATA INFILE '/Users/qingzhouyan/hackreactor/SDC/Q&A/answers_photos.csv'
INTO TABLE answers_photos
fields terminated by ','
optionally enclosed by '"'
ignore 1 lines
;


-- mysql -u root < models/schemas/mysql/answers_photos.sql