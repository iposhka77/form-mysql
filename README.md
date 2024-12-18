cd form-main  `npm install`

запустить 2 терминала

cd form-main `npm start`

cd form-main\server `node server`

код для mysql

CREATE DATABASE formData;
USE formData;

CREATE TABLE form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    contact VARCHAR(15),
    gender VARCHAR(10),
    subject VARCHAR(50),
    url VARCHAR(255),
    about TEXT,
    resume VARCHAR(255)
);

SELECT * FROM form_submissions;

структура проекта 
/REACT-FORM
│
│── /node_modules          
│         
│── /public    
│
│── /server          
│    ├── server.js    
│    ├── /uploads     
│
│── /src
│   ├── /components
    │   ├── FormComponent.js
    │
    │── App.css
    │── App.js  
