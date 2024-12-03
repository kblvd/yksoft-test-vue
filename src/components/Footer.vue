<template>
  <footer>
    <div class="footer__image">
      <img src="/images/pattern.svg" alt="" />
    </div>
    <div class="footer__block">
      <div class="container">
        <div class="container__footer">
          <div class="container__footer__row">
            <div class="logo">
              <router-link to="/">
                <Logo color="white" />
              </router-link>
            </div>
            <MainInfo theme="white" />
            <div class="container__footer__row-item" id="footer-footer">
              2014 - 2024 © ООО "Diamed24" в Уфе
            </div>
          </div>
          <div class="container__footer__row">
            <div class="container__footer__row-title">Услуги</div>
            <div class="container__footer__row-links">
              <a href="#">Гирудотерапия</a>
              <a href="#">Вызов терапевта на дом</a>
              <a href="#">Озонотерапия в Уфе</a>
              <a href="#">Консультация эндокринолога</a>
              <a href="#">Физиотератия</a>
              <a href="#">Прессотерапия</a>
              <a href="#">Диабетология</a>
              <a href="#">Ультразвуковая кавитация</a>
              <a href="#">Кинезиотейпирование</a>
              <a href="#">Массаж</a>
            </div>
          </div>
          <div class="container__footer__row">
            <div class="container__footer__row-title">Клиника</div>
            <div class="container__footer__row-links">
              <a href="#">О клинике</a>
              <a href="#">Врачи</a>
              <a href="#">Отзывы</a>
              <a href="#">Статьи</a>
              <a href="#">Фото клиники</a>
              <a href="#">Правовая информация</a>
              <a href="#">Контакты</a>
            </div>
          </div>
          <div class="container__footer__row">
            <div class="container__footer__row-title">Пациентам</div>
            <div class="container__footer__row-links">
              <a href="#">Цены</a>
              <a href="#">Акции и скидки</a>
            </div>
            <a href="#">Соглашение на обработку персональных данных</a>
          </div>
          <div class="container__footer-footer">
            2014 - 2024 © ООО "Diamed24" в Уфе
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from "@/components/base/Logo.vue";
import MainInfo from "./base/MainInfo.vue";
export default {
  name: "Footer",
  components: {
    Logo,
    MainInfo,
  },
};
</script>

<style scoped lang="scss">
footer {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
}
footer a {
  text-decoration: none;
}
.footer__image {
  width: 100%;
  height: 131px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 30% center;
  }
}
.footer__block {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 var(--mob-padding);
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  background-color: var(--blue);
}
.container__footer-footer {
  display: none;
}
.container {
  background-color: var(--blue);

  &__footer {
    color: var(--white);
    margin: var(--pc-main-info-marg) 0;
    font-family: var(--font1);
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: var(--white);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__row {
      max-width: 306px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      a {
        text-align: left;
      }
    }
    &__row-title {
      font-family: var(--font2);
      font-weight: 600;
      font-size: 20px;
      line-height: 120%;
      color: var(--white);
      margin-bottom: var(--mob-padding);
    }
    &__row-links {
      display: flex;
      flex-direction: column;
      text-align: left;
      gap: 8px;
    }
    &__row:last-child > *:last-child {
      margin-top: 36px;
    }
    &__row:first-child {
      justify-content: space-between;
    }
  }
}
@media screen and (max-width: 1200px) {
  .container__footer {
    grid-row-gap: 24px;
  }
  .container__footer__row {
    min-width: 50%;
  }
  #footer-footer {
    display: none;
  }
  .container {
    &__footer {
      &__row:first-child {
        justify-content: flex-start;
        gap: var(--mob-padding);
      }
    }
  }

  .container__footer-footer {
    display: block;
    width: 100%;
  }
  .footer__image {
    height: 110px;
  }
}
@media screen and (max-width: 640px) {
  .container__footer__row {
    min-width: 100%;
  }
  .footer__image {
    height: 45px;
  }
}
</style>
