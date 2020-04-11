import gsap from 'gsap';

export default class SliderPage {

  constructor ({commit = null} = {}) {
    this.lastSlide = null;
    this.currentSlide = null;
    this.slidesLength = document.querySelectorAll(`[data-slide]`).length;
    this.direction = -1;
    this.cooldown = false;

    this.timelines = {
      next: null,
      prev: null
    };

    if (commit) commit('setSlidesLength', this.slidesLength);

    this.setSlide({slide: 3});
    this.addedEvent();
  };

  setSlide ({
    deltaY = null, // Аргумент ивента
    slide = null // Следующий слайд
  }) {

    // Выходим, если нет слайдов или действует колдаун
    if (!this.slidesLength || this.cooldown) return;

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

    tl.set(slide, {css: {display: 'block'}});
    tl.fromTo(slide, .4, 
      {
        yPercent: () => (this.direction > 0)?140:-140
      }, 
      { 
        yPercent: 0,
        onComplete: () => this.cooldown = false  
      }
    );
  };

  animPrevSlide (slide) {

    let tl = this.timelineInit('prev');
    if (!tl) return;

    tl.fromTo(slide, .4, 
      { yPercent: 0 }, 
      {
        yPercent: () => (this.direction > 0)?-140:140, 
        onComplete: () => this.cooldown = false 
      }
    );
    tl.set(slide, {css: {display: null}});
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