<template>
  <header class="header slide" data-slide="0">

    <!-- Выпадающее меню -->
    <drop-menu :links="navLinks"></drop-menu>
    
    <!-- Лого -->
    <logo class="header-logo" />

    <!-- Гамбургер -->
    <div class="hamburger accent-font" :class="{'active': $store.state.menuOpen}" data-action @click="toggleMenu">
      <span class="hamburger__title">Меню</span>

      <div class="hamburger__item"></div>
      <div class="hamburger__item"></div>
    </div>

    <!-- Соц сети -->
    <div class="header-soc">
      
      <!-- Заголовок -->
      <span class="header-soc__title accent-font">Соц. сети</span>

      <!-- Список соц сетей -->
      <a 
        v-for="item in $store.state.socList"
        :key="item.id"

        v-html="item.icon"

        :href="item.href"
        
        target="_blank"
        class="header-soc__link"
        :class="{'accent-fill': $store.state.menuOpen}"
      >
      </a>
    </div>
    <!-- Конец блока соц сетей -->

    <!-- Начало заголовока -->
    <div class="header-title">

      <!-- Описание -->
      <div class="header-title__description">
        ACLON – Pariatur officia Lorem deserunt ad excepteur dolor veniam sunt sit pariatur aim dolor magna enim duis.
      </div>

      <!-- Контент заголовка -->
      <h1 class="header-title__content title-lg">
        <span>Loremel</span> 
        <span>Ipsumoip</span> 
        <span>Doloreropl</span>
      </h1>
    </div>
    <!-- Конец заголовка -->

    <!-- Слайдер с товарами -->
    <products-slider :slides="products" data-y="30">

      <!-- Кнопка скролла вниз -->
      <div class="header-button" data-action>
        <div class="header-button__wrapper">
          <svg class="header-button__arrow" width="8" height="54" viewBox="0 0 8 54" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.94723 53.3186C4.14249 53.5138 4.45907 53.5138 4.65433 53.3186L7.83631 50.1366C8.03158 49.9413 8.03158 49.6247 7.83631 49.4295C7.64105 49.2342 7.32447 49.2342 7.12921 49.4295L4.30078 52.2579L1.47235 49.4295C1.27709 49.2342 0.960507 49.2342 0.765245 49.4295C0.569983 49.6247 0.569983 49.9413 0.765245 50.1366L3.94723 53.3186ZM3.80078 0.925781L3.80078 52.965L4.80078 52.965L4.80078 0.925781L3.80078 0.925781Z"/>
          </svg>
        </div>
      </div>

    </products-slider>

  </header>
</template>

<script>

import logo from '~/components/logo.vue';
import productsSlider from '~/components/products-slider.vue';
let dropMenu = () =>  import('~/components/drop-menu.vue');

export default {
  components: {
    logo,
    productsSlider,
    dropMenu
  },

  data: () => ({
    // Задержка
    hamburgerCooldown: false,

    // Список товаров
    products: [
      {
        id: 0,
        title: 'Lorem-1'
      },
      {
        id: 1,
        title: 'Lorem-2'
      },
      {
        id: 2,
        title: 'Lorem-3'
      },
      {
        id: 3,
        title: 'Lorem-4'
      },
      {
        id: 4,
        title: 'Lorem-5'
      },
      {
        id: 5,
        title: 'Lorem-6'
      },
    ],
    
    // Навигация
    navLinks: [
      {
        id: 0,
        title: 'О компании'
      },
      {
        id: 1,
        title: 'Продукт'
      },
      {
        id: 2,
        title: 'Стать партнером'
      },
      {
        id: 3,
        title: 'Контакты'
      },
    ]
  }),

  methods: {
    toggleMenu () {
      if (this.hamburgerCooldown) return;

      this.hamburgerCooldown = true;
      setTimeout(() => this.hamburgerCooldown = false, 200)

      let isOpen = this.$store.state.menuOpen

      this.$store.commit('setMenuOpen', !isOpen)
    }
  }
}
</script>

