import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";  
import "@/assets/css/style.css"; 
import "@/assets/css/slider-indicators.scss" 

import AOS from 'aos';
import 'aos/dist/aos.css';
  
const app = createApp(App);

app.use(router);

app.mount("#app");
AOS.init({
    duration: 800, // продолжительность анимации в мс
    easing: 'ease-in-out', // функция плавности
    once: true, // анимация срабатывает только один раз
  });