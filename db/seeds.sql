USE TrackerDB;

INSERT INTO department(name) VALUES
("Sales"),
("Service"),
("Techs"),
("Washbay");

INSERT INTO role(title,salary,department_id) VALUES
("master tech",100000,3),
("sales assosiate",60000,1),
("wash kid",15000,4),
("service writter",60522,2),
("tech",50000,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES
("Ashton","Headley",1,1),
("cara","simms",4,2),
("gordie","tam",2,2),
("Steven","Firth",1,1),
("bill","nye",3,3);

