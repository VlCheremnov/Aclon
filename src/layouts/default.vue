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

    <!-- Кастомный курсор -->
    <div class="custom-cursor">
      <div class="custom-cursor__outer"></div>
    </div>

    <!-- Выпадающее меню -->
    <drop-menu :links="navLinks"></drop-menu>

    <!-- Шапка -->
    <header-template/>

    <!-- Основная часть -->
    <nuxt/>

    <!-- Подвал -->
    <footer-template/>
  </div>
</template>

<script>
import headerTemplate from '~/components/header.vue'
import footerTemplate from '~/components/footer.vue'
import CursorConstructor from '~/modules/cursor.js'
let dropMenu = () =>  import('~/components/drop-menu.vue');

export default {

  // Components
  components: {
    headerTemplate,
    footerTemplate,
    dropMenu
  },
  
  data: () => ({
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
    
  },

  mounted () {
    new CursorConstructor();
  }
}
</script>
