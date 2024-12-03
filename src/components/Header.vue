<template>
  <header ref="header">
    <div class="container">
      <div class="header__content">
        <div class="logo">
          <router-link to="/">
            <Logo />
          </router-link>
        </div>
        <div
          class="header__menu"
          :class="{ open: isMenuOpen }"
          :style="{ '--header-height': `${headerHeight}px` }"
        >
          <nav>
            <ul>
              <div class="header__nav-flex">
                <li class="header__nav-link">
                  <router-link to="/services">Услуги</router-link>
                </li>
                <li class="header__nav-link">
                  <router-link to="/traning"
                    >Обучение гирудотерапии</router-link
                  >
                </li>
                <li class="header__nav-link">
                  <router-link to="/about">О клинике</router-link>
                </li>
              </div>
              <div class="header__nav-flex">
                <li class="header__nav-link">
                  <router-link to="/doctors">Врачи</router-link>
                </li>
                <li class="header__nav-link">
                  <router-link to="/articles">Статьи</router-link>
                </li>
                <li class="header__nav-link">
                  <router-link to="/prices">Цены</router-link>
                </li>
                <li class="header__nav-link">
                  <router-link to="/timetable">Расписание</router-link>
                </li>
                <li class="header__nav-link">
                  <router-link to="/contacts">Контакты</router-link>
                </li>
              </div>
            </ul>
          </nav>
          <MainInfo theme="black" />
        </div>
        <div class="header__right">
          <div class="header__button">
            <BaseButton size="normal" variant="blue-filled"
              >Записаться на сеанс</BaseButton
            >
          </div>
          <div class="header__burger" @click="toggleMenu">
            <div id="nav-icon4" :class="{ open: isMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import Logo from "@/components/base/Logo.vue";
import MainInfo from "./base/MainInfo.vue";

export default {
  name: "Header",
  data() {
    return {
      isMenuOpen: false,
      headerHeight: 0,
    };
  },
  components: {
    Logo,
    BaseButton,
    MainInfo,
  },
  mounted() {
    this.updateHeaderHeight();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    disableScroll() {
      document.documentElement.style.overflowY = "hidden";
    },
    enableScroll() {
      document.documentElement.style.overflowY = "";
    },
    updateHeaderHeight() {
      const header = this.$refs.header;
      if (header) {
        this.headerHeight = header.offsetHeight;
      }
    },
    handleResize() {
      this.updateHeaderHeight();
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        this.enableScroll();
      }
    },
  },
};
</script>

<style scoped>
header {
  position: relative;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  padding: var(--pc-margin);
  padding-bottom: 0;
}
.header__content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
ul li {
  margin-top: 0;
}
ul {
  display: flex;
  list-style: none;
  gap: 41px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--black);
}
li {
  padding-left: 0;
}
li::before {
  display: none;
}
.header__nav-flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 41px;
}
.header__nav-link a {
  transition: all 0.7s ease;
  white-space: nowrap;
}
.header__nav-link a:hover {
  color: var(--hover-link);
}
.header__button {
  width: 167px;
  height: 34px;
}
.main-info {
  display: none;
}
.header__burger {
  display: none;
}
@media screen and (max-width: 1280px) {
  ul {
    flex-direction: column;
    gap: 6px 32px;
  }
  .header__nav-flex {
    justify-content: center;
  }
}
@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 900px) {
  header {
    padding: var(--mob-margin);
    padding-bottom: 0;
  }

  .header__menu {
    position: fixed;
    top: var(--header-height, 0);
    height: calc(100% - var(--header-height, 0));
    right: -100%;
    width: 100%;
    background-color: var(--white);
    transition: right 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: var(--mob-padding);
    box-sizing: border-box;
    justify-content: space-between;
  }
  .main-info {
    display: flex;
  }
  .header__menu.open {
    right: 0;
  }
  ul {
    width: 100%;
    font-size: 18px;
    flex-direction: column;
    align-items: flex-end;
    /* padding: 12px; */
    gap: 12px;
  }

  .header__nav-flex {
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
  .header__burger {
    display: block;
    position: relative;
    z-index: 1100;
    cursor: pointer;
  }
  .header__right {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 16px;
  }
}





/* BURGER MENU */
#nav-icon4 {
  width: 24px;
  height: 16px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon4 span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--black);
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon4 span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4 span:nth-child(2) {
  top: 6px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4 span:nth-child(3) {
  top: 12px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -4px;
  left: 1px;
}

#nav-icon4.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

#nav-icon4.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 13px;
  left: 1px;
}
</style>
