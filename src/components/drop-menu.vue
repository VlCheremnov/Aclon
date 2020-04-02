<template>
  <transition @enter="enterAnim" @leave="leaveAnim">
    <nav class="separator separator_transparent-color drop-menu accent-font" v-if="$store.state.menuOpen">
      <div class="separator__item drop-menu__item"><div class="drop-menu__item-wrapper"></div></div>

      <nuxt-link 
        v-for="item in links"
        :key="item.id"

        to="/"
        class="separator__item drop-menu__item"
      >
        <div class="drop-menu__item-wrapper">
          <div class="drop-menu__title">{{item.title}}</div>
          <div class="drop-menu__image"></div>
        </div>
      </nuxt-link>
      
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
    tl: null
  }),

  methods: {
    AnimInit (el) {
      if (this.tl) this.tl.kill();
      this.tl = gsap.timeline();

      let items = el.querySelectorAll('.drop-menu__item-wrapper');
      let titles = el.querySelectorAll('.drop-menu__title');

      return {titles, items, tl: this.tl};
    },

    enterAnim (el, done) {
      let {titles, items, tl} = this.AnimInit(el);

      tl.set(items, {css: {marginLeft: '0', marginRight: 'auto'}});

      tl.fromTo(items, .2, {width: `0%`}, {width: `100%`, onComplete: () => done()})
        .fromTo(titles, .2, {opacity: 0}, {opacity: 1}, .1)
    },

    leaveAnim (el, done) {
      let {titles, items, tl} = this.AnimInit(el);
      
      tl.set(items, {css: {marginLeft: 'auto', marginRight: '0'}});
      
      tl.fromTo(items, .2, {width: `100%`}, {width: `0%`, onComplete: () => done()})
        .fromTo(titles, .1, {opacity: 1}, {opacity: 0}, 0)
    }
  }

}

</script>