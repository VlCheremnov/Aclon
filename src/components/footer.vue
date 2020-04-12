<template>
  <footer class="slide" :data-slide="$store.state.slidesLength - 1">

    <div class="footer">
        <!-- Верхний блок футера -->
      <div class="footer-form">

        <!-- Бекграунда -->
        <div class="footer-background">

          <!-- Бекграунд -->
          <img src="/img/footer-background.jpg" alt="footer background" class="footer-background__image" data-scale="1.4">

          <!-- Разделители -->
          <div class="separator footer-background__separator">
            <div class="separator__item"></div>
            <div class="separator__item"></div>
            <div class="separator__item"></div>
            <div class="separator__item"></div>
            <div class="separator__item"></div>
            <div class="separator__item"></div>
          </div>
        </div>
        <!-- Конец бекграунда -->
        
        <!-- Форма -->
        <form class="footer-form__wrapper" data-alpha>
          <!-- Заголовок -->
          <h4 class="footer-form__title">Получить консультацию</h4>

          <!-- Инпут -->
          <div
            v-once 
            v-for="(item, index) in fields" 
            :key="`input-${index}`"

            class="input"
            data-action=""
          >
            <label class="input__label" :for="item.id">{{item.label}}</label>
            <input :type="item.type" class="input__field" :id="item.id">
          </div>
          <!-- Конец инпута -->

          <!-- Кнопка -->
          <nuxt-link to="/" class="footer-form__button accent-font">Отправить</nuxt-link>

        </form>
        <!-- Конец формы -->

      </div>
      <!-- Конец верхнего блока -->

      <!-- Навигация в футере -->
      <div class="footer-nav container">

        <!-- Левый блок -->
        <div class="footer-nav__block footer-logo">
          <!-- Лого -->
          <div class="footer-logo__wrapper">
            <logo class="footer-logo__icon" color="#fff" />

            <div class="footer-logo__rights">Все права защищены</div>
          </div>
          
        </div>
        <!-- Конец левого блока -->

        <!-- Правый блок -->
        <div class="footer-nav__block">

          <!-- Список -->
          <ul class="footer-list">
            <li class="footer-list__link">Главная</li>
            <li class="footer-list__link">О нас</li>
            <li class="footer-list__link">Магазин</li>
          </ul>

          <!-- Список -->
          <ul class="footer-list">
            <li class="footer-list__link">Стать партнером</li>
            <li class="footer-list__link">Контакты</li>
          </ul>


          <ul class="footer-soc">
            <li
              v-once
              v-for="item in $store.state.socList"

              :key="`footer-soc-${item.id}`"

              class="footer-soc__item"
            >
              <a class="footer-soc__link" target="_blank" :href="item.href" v-html="item.icon"></a>
            </li>
          </ul>
        </div>
        <!-- Конец правого блока -->

      </div> 
      <!-- Конец навигации -->
    </div>

  </footer>
</template>

<script>

import logo from '~/components/logo.vue';

export default {
  // Local store
  data: () => ({
    fields: [
      {
        label: 'Ваше имя',
        id: 'name',
        type: 'text'
      },
      {
        label: 'Ваш email',
        id: 'email',
        type: 'text'
      },
      {
        label: 'Ваш телефон',
        id: 'num',
        type: 'tel'
      },
    ]
  }),

  components: {
    logo
  },

  methods: {

  }
}
</script>

