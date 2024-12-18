const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root',
  database: 'formData', 
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL: ', err);
  } else {
    console.log('Подключено к MySQL');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post('/api/submit', upload.single('resume'), (req, res) => {
  const { firstName, lastName, email, contact, gender, subject, url, about } = req.body;
  const resume = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO form_submissions (first_name, last_name, email, contact, gender, subject, url, about, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, email, contact, gender, subject, url, about, resume];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Ошибка при сохранении данных в MySQL:', err);
      return res.status(500).json({ message: 'Ошибка при сохранении данных в базе данных', error: err });
    }
    res.status(200).json({ message: 'Данные успешно отправлены!' });
  });
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
