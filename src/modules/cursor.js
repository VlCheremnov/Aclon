import { gsap } from 'gsap'

export default class Cursor {
  constructor () {
    // DOM элементы
    this.el = this.createCursor()
    this.elOuter = this.createOuterCursor()

    // Размеры курсора
    this.scale = {
      default: 1,
      hover: 1.5,
      outerHover: .5,
      click: .7
    }

    // Активные эффекты
    this.effects = {
      move: false,
      click: false,
      focus: false,
      hide: false
    }

    // Таймлайны
    this.timeLines = {
      position: null,
      click: null,
      focus: null
    }

    this.addEvent()
  }

  createCursor () {
    let cursor = document.querySelector('.custom-cursor');

    if (cursor) return cursor;

    let div = document.createElement('div');
    div.classList.add('custom-cursor');
    document.body.prepend(div);

    return div;
  }

  createOuterCursor () {
    let outerCursor = document.querySelector('.custom-cursor__outer');

    if (outerCursor) return outerCursor;

    let div = document.createElement('div');
    div.classList.add('custom-cursor__outer');
    this.el.append(div);

    return div;
  }

  setCursorEffects (effect, bool = false) {
    if (!effect || this.effects[effect] == bool) return;
    this.effects[effect] = bool;
  }
  
  getCursorEffects (effect) {
    if (!effect) return;
    return this.effects[effect];
  }

  initTimeLine (TimeLineName) {
    // Завершаем анимацию, если она есть, и создаем новый таймлайн
    if (this.timeLines[TimeLineName]) this.timeLines[TimeLineName].kill();
    this.timeLines[TimeLineName] = gsap.timeline();
    
    return this.timeLines[TimeLineName];
  }

  // События при движении мыши
  mouseMovementEffects (e) {

    // Задаем позицию курсора
    this.setPositionCursor(e);

    let targetActiveElement = e.target.closest('[data-action]') || e.target.closest('a'),
        focusElement = this.getCursorEffects('focus');

    // focus
    if(targetActiveElement && !focusElement)
      this.enterAnimFocus();
    // blur
    else if (!targetActiveElement && focusElement) 
      this.leaveAnimFocus();
  }

  // Позиция курсора
  setPositionCursor (e, time = .15) {
    this.setCursorEffects('move', true);
    
    // Текущий таймлайн
    let tl = this.initTimeLine('position');

    // Анимация
    tl.to(this.el, time, {
      ease: "power2.out", 
      x: e.clientX, 
      y: e.clientY, 
      // Сбросить эффект движения
      onComplete: this.setCursorEffects.bind(this, 'move', false)
    });
  }

  // Анимируем курсор при фокусе активного элемента
  enterAnimFocus (ease = "power2.out") {
    this.setCursorEffects('focus', true);
    
    // Текущий таймлайн
    let tl = this.initTimeLine('focus');

    // Размер курсора при наведении 
    let getScale = () => {
      if (this.getCursorEffects('click')) 
        return this.scale.click;
      else 
        return this.scale.hover;
    };
    
    // Анимация курсора
    tl.to(this.el, .15, {
      ease: ease, 
      scale: getScale.bind(this)
    });

    tl.to(this.elOuter, .15, {
      ease: ease, 
      scale: this.scale.outerHover
    }, 0);
  }

  // Анимация при блуре
  leaveAnimFocus () {
    this.setCursorEffects('focus', false);

    // Текущий таймлайн
    let tl = this.initTimeLine('focus');

    // Размер курсора при блуре 
    let getScale = () => {
      if (this.getCursorEffects('click')) 
        return this.scale.click;
      else 
        return this.scale.default
    };

    tl.to(this.el, .15, { scale: getScale.bind(this) });
    tl.to(this.elOuter, .15, { scale: this.scale.default }, 0);
  }

  // Анимируем курсор при клике
  enterAnimClick () {
    this.setCursorEffects('click', true);

    let tl = this.initTimeLine('click');

    tl.to(this.el, .1, {scale: this.scale.click});
  }

  // Возвращаем состояние курсора после клика
  leaveAnimClick () {
    this.setCursorEffects('click', false);

    let tl = this.initTimeLine('click');
    
    // Если курсор на активном элементе
    if (this.getCursorEffects('focus')) {
      this.enterAnimFocus("back.out(4)")
    } 
    // Возвращаем в исходное состояние
    else {
      tl.to(this.el, .2, {
        ease: "back.out(4)", 
        scale: this.scale.default
      });
    }; 
  }

  // Скрываем курсор
  hideCursor () {
    if (this.getCursorEffects('hide')) return;
    this.setCursorEffects('hide', true);

    this.el.style.display = 'none';
  }
  // Показываем курсор
  showCursor (e) {
    if (!this.getCursorEffects('hide')) return;
    this.setCursorEffects('hide', false);

    this.el.style.display = null;
    this.setPositionCursor(e, 0)
  }

  // Добавляем события
  addEvent () {
    // Позиция курсора
    document.addEventListener('mousemove', e => this.mouseMovementEffects(e));

    // Анимация при нажатии левого клика
    document.addEventListener('mousedown', e => this.enterAnimClick(e));
    document.addEventListener('mouseup', e => this.leaveAnimClick(e));

    // Скрываем курсор
    document.addEventListener('mouseleave', e => this.hideCursor(e))
    // Показываем курсор
    document.addEventListener('mouseenter', e => this.showCursor(e))

    // Отключаем контекстное меню
    // document.body.oncontextmenu = () => false;
  } 
};
