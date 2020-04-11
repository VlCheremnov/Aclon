<template>
  <!-- Анимация навигационного меню -->
  <transition @enter="enterAnim" @leave="leaveAnim">
    <!-- Меню -->
    <nav class="separator separator_transparent-color drop-menu accent-font" v-show="$store.state.menuOpen">
      <!-- Заглушка с левого края -->
      <div class="separator__item drop-menu__item"><div class="drop-menu__item-wrapper"></div></div>

      <!-- Ссылки -->
      <nuxt-link 
        v-for="item in links"
        v-once
        :key="item.id"

        to="/"
        class="separator__item drop-menu__item"
      >
        <!-- Обертка для анимации -->
        <div class="drop-menu__item-wrapper">
          <!-- Заголовок -->
          <div class="drop-menu__title">{{item.title}}</div>
          <!-- Картинка -->
          <div class="drop-menu__image"></div>
        </div>
      </nuxt-link>
      <!-- Конец ссылки -->
      
      <!-- Заглушка с правого края -->
      <div class="separator__item drop-menu__item"><div class="drop-menu__item-wrapper"></div></div>
    </nav>
  </transition>
</template>

<script>
import { gsap } from 'gsap'

export default {
  
  props: {
    links: Array
  },

  data: () => ({
    // TimeLine
    tl: null
  }),

  methods: {
    AnimInit (el) {
      if (this.tl) this.tl.kill();
      this.tl = gsap.timeline();

      let items = el.querySelectorAll('.drop-menu__item-wrapper');
      let titles = el.querySelectorAll('.drop-menu__title');
      let images = el.querySelectorAll('.drop-menu__image');

      return {images, titles, items, tl: this.tl};
    },

    enterAnim (el, done) {
      let {images, titles, items, tl} = this.AnimInit(el);

      tl.set(items, {css: {marginLeft: '0', marginRight: 'auto'}})
        .set(images, {css: {display: null}});

      tl.fromTo(items, .2, {width: `0%`, opacity: 0}, {width: `100%`, opacity: 1, onComplete: () => done()})
        .fromTo(titles, .2, {opacity: 0}, {opacity: 1}, .1)
    },

    leaveAnim (el, done) {
      let {images, titles, items, tl} = this.AnimInit(el);
      
      tl.set(items, {css: {marginLeft: 'auto', marginRight: '0'}})
        .set(images, {css: {display: 'none'}});
      
      tl.fromTo(items, .2, {width: `100%`, opacity: 1}, {width: `0%`, opacity: 0, onComplete: () => done()})
        .fromTo(titles, .1, {opacity: 1}, {opacity: 0}, 0)
    }
  }

}

</script>