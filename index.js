//Подключаем express, body-parser и модуль запроса погоды по api https://openweathermap.org
const express = require("express");
const bodyParser = require("body-parser");
const weatherRequest = require("./requests/weather.request");

//Создаем приложение express
const app = express();

// Инициализируем отрисовку через ejs
app.set("view engine", "ejs");

//Задаем папку для статик файлов
app.use(express.static("public"));

//Подключаем body парсер
app.use(bodyParser.urlencoded({ extended: true }));

// Отрисовка index по get запросу /
app.get("/", (req, res) => {
  res.render('index', {weather: null, error: null });
});

// Отрисовка index по post запросу с ответом от сервера
app.post("/", async (req, res) => {
  const { city } = req.body;
  const {weather, error} = await weatherRequest(city);
  res.render('index', {weather, error});

});

//Запуск сервера на 3000 порту
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
 