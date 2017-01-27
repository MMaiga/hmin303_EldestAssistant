insert into role (rolecode ,rolename)
  values(0,'responsible') ;

insert into role (rolecode ,rolename)
  values(1,'senior') ;

  LOAD DATA LOCAL INFILE 'dataGenerated/category.csv'
  INTO TABLE category
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,categoryTable,categoryCode,categoryName) ;

  LOAD DATA LOCAL INFILE 'dataGenerated/personSenior.csv'
  INTO TABLE person
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (firstName,lastName,username,birthdate,address,password,mail,role,photo,phone,id) ;

  LOAD DATA LOCAL INFILE 'dataGenerated/personResponsible.csv'
  INTO TABLE person
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,firstName,lastName,username,birthdate,address,password,mail,role,photo,phone) ;

  LOAD DATA LOCAL INFILE 'dataGenerated/eldest_responsible.csv'
  INTO TABLE eldest_responsible
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,idEldest,idResponsible) ;


  LOAD DATA LOCAL INFILE 'dataGenerated/contact.csv'
  INTO TABLE contact
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,personID,name,phone,mail) ;

  LOAD DATA LOCAL INFILE 'dataGenerated/site.csv'
  INTO TABLE site
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,personID,category,link) ;


  LOAD DATA LOCAL INFILE 'dataGenerated/prescription.csv'
  INTO TABLE prescription
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,personID,responsibleID,authorID,creation_date,completion_date,description) ;


  LOAD DATA LOCAL INFILE 'dataGenerated/status.csv'
  INTO TABLE status
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,personID,responsibleID,description,status_date) ;

  LOAD DATA LOCAL INFILE 'dataGenerated/eldest_responsible.csv'
  INTO TABLE eldest_responsible
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
  (id,idEldest,idResponsible,state,senderRole) ;




/*
SET FOREIGN_KEY_CHECKS=1;
*/
