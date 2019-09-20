// Подключаем request-promise
const rp = require("request-promise");

// Экспорт ответа сервера из модуля 
module.exports = async function(city = "") {
  //KEY - ключ API
  const KEY = "35c5e15aa7207596b56dbcd4c9d9f15b";
  // ссылка для запроса погоды у api
  const uri = "http://api.openweathermap.org/data/2.5/weather";

  // Создаем объект в json с ответом от api
  const options = {
    uri: uri,
    qs: {
      appid: KEY,
      q: city,
      units: "imperial"
    },
    json: true
  };

  // Проверяем запрос, отдаем данные или ошибку
  try {
    const data = await rp(options);
    const celsius = ((data.main.temp - 32) * 5) / 9;

    return {
      weather: `${data.name}: ${celsius.toFixed(0)}`,
      error: null
    };
  } catch (error) {
    return {
      weather: null,
      // error: error.error.message
      error: "Имя города не может быть пустым"
    };
  }
};
 