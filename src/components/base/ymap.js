// src/customLibrary.js

// Функция для загрузки внешнего скрипта
function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        // Скрипт уже подключен
        resolve();
        return;
      }
  
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${src}`));
      document.head.appendChild(script);
    });
  }
  
  // Загрузка Yandex Maps API v2
  async function loadYandexMapsV2(apiKey, lang = "ru_RU") {
    //const url = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${lang}`;
    const url = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=${lang}`;
    await loadScript(url);
  
    if (!window.ymaps3) {
      throw new Error("Yandex Maps API v2 не загрузился вообще");
    }
  
    // Возвращаем глобальный объект ymaps
    return window.ymaps3;
  }
  
  export default {
    loadYandexMapsV2,
  }; 