const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Встановіть бажаний порт

// Парсер для обробки даних форми з тіла запиту
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Шлях для відображення сторінки з формою
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Вкажіть шлях до вашого HTML-файлу з формою
});

// Обробка відправки форми
app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  // Налаштування відправки пошти за допомогою nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Вкажіть поштовий сервіс, наприклад, 'Gmail'
    auth: {
      user: 'vad.yevich@gmail.com', // Вкажіть вашу електронну адресу
      pass: 'lubimayaola15' // Вкажіть ваш пароль для входу до пошти
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com', // Відправник
    to: email, // Одержувач (відповідно до даних із форми)
    subject: 'Нова заявка з вашого сайту', // Тема листа
    text: message // Текст повідомлення (відповідно до даних із форми)
  };

  // Відправка листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Під час відправки заявки виникла помилка.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Ваша заявка успішно надіслана!');
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
