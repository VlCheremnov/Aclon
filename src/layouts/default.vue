<template>
  <div class="layout">

    <!-- Кастомный курсор -->
    <div class="custom-cursor">
      <div class="custom-cursor__outer"></div>
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
import CursorConstructor from '~/modules/cursor.js'

export default {

  // Components
  components: {
    // Шапка
    headerTemplate,
    // Футер
    footerTemplate
  },
  
  data: () => ({
    
  }),

  methods: {
    
  },

  mounted () {
    new CursorConstructor();
  }
}
</script>
