<template>
  <!-- Слайдер -->
  <div class="products">

    <!-- <div class="products-bar">
      <div class="products-bar__progress"></div>
    </div> -->

    <!-- Aside -->
    <div class="products-aside">
      
      <!-- Анимация заголовока -->
      <transition name="hide" mode="out-in">
        <!-- Заголовок -->
        <h3 class="products-aside__title" :key="currentSlide">
          <span>{{ slides[currentSlide].title }}</span>
        </h3>
      </transition>
      
      <!-- Шкала -->
      <div class="products-aside__slide-scale">
        <!-- Поинт на шкале -->
        <div 
          class="products-aside__point" 
          :style="` 
            width: ${pointHeight}%; 
            left: ${pointPosition}%;
          `"
        >
        </div>
      </div>
      
      <!-- Описание товаров -->
      <div class="products-aside__description">Lorem ipsum dolor sit amet ipsum dolor</div>
    </div>
    <!-- Конец aside -->

    <!-- Навигация по слайдеру -->
    <div class="products-nav">
      
      <!-- Кнопка - предыдущий слайд -->
      <div class="square-button" data-action @click="toggleSlide(-1)">
        <svg class="square-button__icon" width="27" height="8" viewBox="0 0 27 8" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.891505 3.6152C0.696243 3.81046 0.696243 4.12704 0.891505 4.3223L4.07349 7.50428C4.26875 7.69955 4.58533 7.69955 4.78059 7.50428C4.97585 7.30902 4.97585 6.99244 4.78059 6.79718L1.95216 3.96875L4.78059 1.14032C4.97585 0.945061 4.97585 0.628478 4.78059 0.433216C4.58533 0.237954 4.26875 0.237954 4.07349 0.433216L0.891505 3.6152ZM26.959 3.46875L1.24506 3.46875V4.46875L26.959 4.46875V3.46875Z"/>
        </svg>
      </div>

      <!-- Кнопка - следующий слайд -->
      <div class="square-button" data-action @click="toggleSlide(1)">
        <svg class="square-button__icon" width="27" height="8" viewBox="0 0 27 8" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.8302 4.32231C27.0254 4.12704 27.0254 3.81046 26.8302 3.6152L23.6482 0.433218C23.4529 0.237956 23.1364 0.237956 22.9411 0.433218C22.7458 0.62848 22.7458 0.945063 22.9411 1.14032L25.7695 3.96875L22.9411 6.79718C22.7458 6.99244 22.7458 7.30902 22.9411 7.50429C23.1363 7.69955 23.4529 7.69955 23.6482 7.50429L26.8302 4.32231ZM0.762695 4.46875L26.4766 4.46875L26.4766 3.46875L0.762695 3.46875L0.762695 4.46875Z"/>
        </svg>
      </div>
    </div>
    <!-- Конец навигации -->

    <!-- Обертка слайдов -->
    <div class="products__wrapper">

      <!-- Анимация слайда -->
      <transition name="products" v-for="item in slides" :key="`product-transition-${item.id}`">
        <!-- Слайд -->
        <div
          v-show="item.id == currentSlide"

          class="products-item"
        >
          <!-- Изображение слайда -->
          <img class="products-item__image" :src="`/products-slider/slide-${item.id}.jpg`" alt="slide-0">
        </div>
      </transition>
      <!-- Конец слайда -->

    </div>
    
    <slot />
  </div>
</template>

<script>

export default {

  props: {
    slides: Array
  },

  data: () => ({
    // Текущий слайд
    currentSlide: 0,

    // Задежрка
    sliderCooldown: false
  }),

  computed: {
    // Кол-во слайдов
    slidesLength () {
      return this.slides.length 
    },

    // Размеры поинта
    pointHeight () {
      return 100 / this.slidesLength
    },

    // Позиция поинта
    pointPosition () {
      return 100 - this.pointHeight - (this.pointHeight * this.currentSlide)
    }
  },

  methods: {
    // Переключаем текущий слайд
    toggleSlide (step = 1) {
      // Проверка на число
      if (!isFinite(step) || this.sliderCooldown) return
      
      // Задержка
      this.sliderCooldown = true;
      setTimeout(() => this.sliderCooldown = false, 240)

      // Следующий слайд
      let nextSlide = this.currentSlide + +step
      
      // Переходим в начало, если след. слайд > кол-ва слайдов
      if (nextSlide >= this.slidesLength) nextSlide = 0;
      // Переходим в конец, если след. слайд < 0
      else if (nextSlide < 0) nextSlide = this.slidesLength-1;
      
      this.currentSlide = nextSlide;

    }
  }
}
</script>