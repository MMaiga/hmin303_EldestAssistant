
drop database db_EldestAssistant ;
CREATE database db_EldestAssistant ;
use db_EldestAssistant ;

DROP TABLE role
;
CREATE TABLE role
(
  id int not null auto_increment ,
  rolecode int ,
  rolename varchar(100) ,
  CONSTRAINT pk_roleID PRIMARY KEY (id),
  CONSTRAINT unk_rolecode UNIQUE (rolecode)
);

DROP TABLE category
;
CREATE TABLE category
(
  id int not null auto_increment ,
  categoryTable varchar(50) ,
  categoryCode int ,
  categoryName varchar(500) ,
  CONSTRAINT pk_categoryID PRIMARY KEY (id),
  CONSTRAINT pk_categoryCode UNIQUE (categoryCode)
);


DROP TABLE person
;
CREATE TABLE person
(
  id int not null auto_increment  ,
  firstname   varchar(100),
  lastname varchar(100),
  username varchar(100),
  birthdate date,
  address varchar(400),
  password varchar(20),
  mail varchar(200),
  phone varchar(50),
  role int ,
  photo varchar(250) ,
  CONSTRAINT pk_personID PRIMARY KEY (id),
  CONSTRAINT fk_rolecode FOREIGN KEY (role) REFERENCES role(rolecode),
  CONSTRAINT uc_person_phone UNIQUE (phone)
);

DROP TABLE eldest_responsible
;
CREATE TABLE eldest_responsible
(
  id int not null auto_increment  ,
  idEldest int,
  idResponsible int,
  state int DEFAULT 0,
  senderRole int ,
  date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT pk_eldest_responsible PRIMARY KEY (id),
  CONSTRAINT fk_eldest_relation FOREIGN KEY (idEldest) REFERENCES person(id),
  CONSTRAINT fk_responsible_relation FOREIGN KEY (idResponsible) REFERENCES person(id),
  CONSTRAINT uc_eldest_responsible UNIQUE (idEldest,idResponsible)
);


DROP TABLE site
;
CREATE TABLE site
(
  id int not null auto_increment ,
  personID int ,
  category int ,
  link varchar(500) ,
  CONSTRAINT pk_siteID PRIMARY KEY (id),
  CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES category(categoryCode),
  CONSTRAINT fk_sitepersonID FOREIGN KEY (personID) REFERENCES person(id)
);

DROP TABLE contact
;
CREATE TABLE contact
(
  id int not null auto_increment ,
  personID int ,
  name varchar(100) ,
  phone int ,
  mail varchar(200),
  CONSTRAINT pk_contactID PRIMARY KEY (id),
  CONSTRAINT fk_contactpersonID FOREIGN KEY (personID) REFERENCES person(id)
);

DROP TABLE status
;
CREATE TABLE status
(
  id int not null auto_increment ,
  personID int ,
  responsibleID int ,
  status_date date ,
  description text ,
  CONSTRAINT pk_statusID PRIMARY KEY (id),
  CONSTRAINT fk_statuspersonID FOREIGN KEY (personID) REFERENCES person(id),
  CONSTRAINT fk_statusResponsibleID FOREIGN KEY (responsibleID) REFERENCES person(id)
);

DROP TABLE prescription
;
CREATE TABLE prescription
(
  id int not null auto_increment ,
  personID int ,
  responsibleID int ,
  authorID int ,
  creation_date date ,
  completion_date date ,
  description text ,
  validation int DEFAULT 0,
  CONSTRAINT pk_prescriptionID PRIMARY KEY (id),
  CONSTRAINT fk_prescriptionpersonID FOREIGN KEY (personID) REFERENCES person(id),
  CONSTRAINT fk_prescriptionResponsibleID FOREIGN KEY (responsibleID) REFERENCES person(id),
  CONSTRAINT fk_prescriptionAuthorID FOREIGN KEY (authorID) REFERENCES person(id)
);
