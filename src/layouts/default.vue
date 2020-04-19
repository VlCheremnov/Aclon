<template>
  <div class="layout">

    <div class="separator">
      <div class="separator__item"></div>
      <div class="separator__item"></div>
      <div class="separator__item"></div>
      <div class="separator__item"></div>
      <div class="separator__item"></div>
      <div class="separator__item"></div>
    </div>

    <!-- Шапка -->
    <header-template @next-slide="nextSlide()" />

    <!-- Основная часть -->
    <nuxt/>

    <!-- Подвал -->
    <footer-template/>
  </div>
</template>

<script>
import headerTemplate from '~/components/header.vue';
import footerTemplate from '~/components/footer.vue';

let Cursor = () => import('~/modules/cursor.js');
let SliderPage = () => import('~/modules/main-slider_page.js');

export default {

  // Components
  components: {
    headerTemplate,
    footerTemplate
  },

  data: () => ({
    slider: null
  }),

  methods: {
    nextSlide () {
      this.slider.setSlide({slide: 1})
    }
  },

  mounted () {

    // Проверка на мобильное устройство
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

      // Курсор
      new Cursor()
        .then((module) => new module.default())
        .catch(() => document.querySelector('html').style.cursor = 'default');

      // Слайдер страниц
      new SliderPage()
        .then((module) => this.slider = new module.default(this.$store))
        .catch((err) => console.log(err));
    }
  }
}
</script>
