<template>
  <main>

    <component 
      v-for="(item, index) in componentsList" 
      
      :key="`index_slide-${index}`" 
      :is="item" 
      :data-slide="++index"

      class="slide"
    ></component>

  </main>
</template>

<script>

import aboutUs from '~/components/index-page/about_us.vue';
import product from '~/components/index-page/product.vue';
import program from '~/components/index-page/program.vue';
import partnership from '~/components/index-page/partnership.vue';

// Компоненты
let components = {
  aboutUs,
  product,
  program,
  partnership
};

export default {
  components: components,

  computed: {
    // Конвертируем объект с компонентами в массив
    componentsList () {
      return Object.values(components)
    }
  }
}
</script>

