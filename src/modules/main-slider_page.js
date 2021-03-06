import gsap from 'gsap';

export default class SliderPage {

  constructor ($store = null) {
    this.lastSlide = null;
    this.currentSlide = null;
    this.slidesLength = document.querySelectorAll(`[data-slide]`).length;
    this.direction = -1;
    this.cooldown = false;
    this.$store = $store;

    this.timelines = {
      next: null,
      prev: null
    };

    console.log($store);
    if ($store && $store.commit) $store.commit('setSlidesLength', this.slidesLength);

    this.setSlide({slide: 0});
    this.addedEvent();
  };

  setSlide ({
    deltaY = null, // Аргумент ивента
    slide = null // Следующий слайд
  }) {

    console.log('ep')

    // Выходим, если 
    if (
      (this.$store && this.$store.state.menuOpen) || // Открыто меню
      !this.slidesLength ||  // Нет слайдов
      this.cooldown  ||  // Действует колдаун
      window.innerWidth <= 992 // Устройство с маленьким экраном
    ) return;
    console.log('ep2')

    // Последний слайд
    let lastSlide = this.currentSlide;

    // Задаем следующий слайд
    if (slide || slide == 0) this.currentSlide = slide;
    else if (deltaY > 0 && this.currentSlide < this.slidesLength - 1) this.currentSlide++;
    else if (deltaY < 0 && this.currentSlide > 0) this.currentSlide--;
    
    // Выходим, если не было перехода
    if(this.currentSlide == lastSlide) return;

    // Создаем колдаун
    this.cooldown = true;

    // Задаем последний слайд
    this.lastSlide = lastSlide;

    // Направление (<0 = вверх, >0 = вниз)
    let direction = this.currentSlide - this.lastSlide;
    if (direction) this.direction = direction;

    // Анимируем слайды
    this.animSlides()
  };

  animSlides () {
    // Следующий слайд
    let nextSlide = document.querySelector(`[data-slide="${this.currentSlide}"]`);
    // Предыдущий слайд
    let prevSlide = document.querySelector(`[data-slide="${this.lastSlide}"]`);
    
    // Анимация следующего слайда
    if (nextSlide) this.animNextSlide(nextSlide);
    // Анимация предыдущего слайда
    if (prevSlide) this.animPrevSlide(prevSlide);
  };
  
  animNextSlide (slide) {

    let tl = this.timelineInit('next');
    if (!tl) return;

    let verticalAnim = slide.querySelectorAll('[data-y]');
    let horizontalAnim = slide.querySelectorAll('[data-x]');
    let scaleAnim = slide.querySelectorAll('[data-scale]');
    let alphaAnim = slide.querySelectorAll('[data-alpha]');

    // Показываем слайд
    tl.set(slide, {css: {display: 'block'}});

    // Анимация скролла
    tl.fromTo(slide, .6, 
      {
        yPercent: () => (this.direction > 0)?140:-140
      }, 
      { 
        yPercent: 0,
        onComplete: () => this.cooldown = false  
      }
    );
    
    // Вертикальная анимация
    if (verticalAnim.length > 0) {
      tl.set(verticalAnim, {xPercent: (i, el) => (el.dataset.sx)? el.dataset.sx : 0}, 0)
      tl.fromTo(
        verticalAnim, 
        .6, 
        {
          yPercent: (i, el) => (this.direction > 0)? el.dataset.y : -el.dataset.y
        }, 
        {
          yPercent: 0
        }, 0
      );
    };

    // Горизонтальная анимация
    if (horizontalAnim.length > 0)
      tl.fromTo(horizontalAnim, .3, {xPercent: (i, el) => el.dataset.x}, {xPercent: 0}, .3);
    
    // Анимация размера
    if (scaleAnim.length > 0)
      tl.fromTo(scaleAnim, .6, {scale: (i, el) => el.dataset.scale}, {scale: 1}, 0);
    
    // Анимация появления
    if (alphaAnim.length > 0)
      tl.fromTo(alphaAnim, .3, {opacity: 0}, {opacity: 1}, .3);


  };

  animPrevSlide (slide) {

    let tl = this.timelineInit('prev');
    if (!tl) return;

    tl.fromTo(slide, .6, 
      { yPercent: 0 }, 
      {
        yPercent: () => (this.direction > 0)?-140:140, 
        onComplete: () => this.cooldown = false 
      }
    );
    tl.set(slide, {css: {display: null, transform: null}});
  };

  timelineInit (state = null) {
    if (!state) return;

    if(this.timelines[state]) this.timelines[state].kill();
    this.timelines[state] = gsap.timeline();

    return this.timelines[state];
  };

  // Добавляем события скролла
  addedEvent () {
    document.addEventListener('wheel', (e) => this.setSlide(e));
  };
}