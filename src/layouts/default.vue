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
import Cursor from '~/modules/cursor.js'
import SliderPage from '~/modules/main-slider_page.js'

export default {

  // Components
  components: {
    headerTemplate,
    footerTemplate
  },

  mounted () {
    new Cursor();
    new SliderPage(this.$store);
  }
}
</script>
