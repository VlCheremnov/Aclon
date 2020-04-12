<template>
  <!-- Слайд -->
  <section>

    <!-- Блок программы -->
    <div class="container program-layout">

      <!-- Заголовок -->
      <h2 class="title program-layout__title" data-y="-100">
        Уникальные
        <span class="title__line">оздоровительные</span>
        <div>программы</div>
      </h2>
      <!-- Конец заголовка -->

      <!-- Слайдер с программой -->
      <div class="program-slider">

        <!-- Заглушка -->
        <div class="program-slider__stub" data-y="80"></div>

        <!-- Обертка слайдов-->
        <div class="program-slider__slides">

          <!-- Слайд -->
          <transition 
            @enter="enterAnim" 
            @leave="leaveAnim" 
            
            v-for="item in slidesLength" 
            :key="`program-slide-${item}`"
          >
            <div v-if="item-1 == currentSlide" class="program-slide">
              <!-- Блок -->
              <div class="program-slide__side-block" data-alpha>
                <!-- Заголовок слайда -->
                <h3 class="program-slide__title">{{programSlide.title}} - {{item}}</h3>

                <!-- Описание -->
                <div class="description program-slide__description">{{programSlide.description}}</div>
              </div>

              <!-- Изображение -->
              <div class="program-slide__image" :style="`background: ${programSlide.image}`" data-scale="1.3"></div>

            </div>
          </transition>
          <!-- Конец слайда -->

        </div>
        <!-- Конец обертки -->

        <!-- Стрелки -->
        <div class="program-slider__arrow-wrapper">

          <!-- Стрелка влево -->
          <div class="program-slider__arrow" data-action="" @click="slider(-1)">
            <svg width="135" height="15" viewBox="0 0 135 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.20227 6.79483C0.811752 7.18536 0.811752 7.81852 1.20227 8.20905L7.56623 14.573C7.95676 14.9635 8.58992 14.9635 8.98045 14.573C9.37097 14.1825 9.37097 13.5493 8.98045 13.1588L3.32359 7.50194L8.98045 1.84509C9.37097 1.45456 9.37097 0.821399 8.98045 0.430874C8.58992 0.0403499 7.95676 0.0403499 7.56623 0.430874L1.20227 6.79483ZM134.336 6.50195L1.90938 6.50194L1.90938 8.50194L134.336 8.50195L134.336 6.50195Z"/>
            </svg>
          </div>

          <!-- Стрелка вправо -->
          <div class="program-slider__arrow" data-action="" @click="slider(1)">
            <svg width="135" height="15" viewBox="0 0 135 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M133.76 8.20906C134.151 7.81854 134.151 7.18537 133.76 6.79485L127.396 0.430885C127.006 0.0403609 126.372 0.0403609 125.982 0.430885C125.591 0.82141 125.591 1.45457 125.982 1.8451L131.639 7.50195L125.982 13.1588C125.591 13.5493 125.591 14.1825 125.982 14.573C126.372 14.9635 127.006 14.9635 127.396 14.573L133.76 8.20906ZM0.625977 8.50195L133.053 8.50195V6.50195L0.625977 6.50195L0.625977 8.50195Z"/>
            </svg>
          </div>

        </div>

      </div>
      <!-- Конец слайдера -->

    </div>
  </section>
</template>

<script>

import gsap from 'gsap'

export default {
  data: () => ({
    programSlide: {
      title: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nostrum corporis odit velit. Voluptatibus, qui!',
      image: '#DDCABC'
    },

    // Кол-во слайдов
    slidesLength: 6,

    // Текущий слайд
    currentSlide: 0,

    // Колдаун
    cooldown: false
  }),

  methods: {
    // Слайдер
    slider (direction) {
      // Колдаун
      if (this.cooldown) return;
      this.cooldown = true;

      setTimeout(() => this.cooldown = false, 200)

      // Задаем следующий слайд
      let nextSlide = this.currentSlide + direction;

      if (nextSlide > this.slidesLength - 1) nextSlide = 0;
      else if (nextSlide < 0) nextSlide = this.slidesLength - 1;

      this.currentSlide = nextSlide
    },

    // Анимация слайдов
    enterAnim (el, done) {
      let tl = gsap.timeline();

      let image = el.querySelector('.program-slide__image')

      tl.fromTo(el, .2, {opacity: 0}, {opacity: 1, onComplete: done}, .2)
    },

    leaveAnim (el, done) {
      let tl = gsap.timeline();
      tl.fromTo(el, .2, {opacity: 1}, {opacity: 0, onComplete: done})
    }
  }

}

</script>