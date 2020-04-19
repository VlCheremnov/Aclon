<template>
  <!-- Слайд -->
  <section>

    <!-- Блок "О нас" -->
    <div class="container about">

      <img src="/img/quotes.svg" alt="quotes" class="about__quotes" data-y="-100">

      <!-- Изображение -->
      <div class="about__item" data-y="100">
        <div class="about__image"></div>
      </div>

      <!-- Контент с описанием -->
      <div class="about__item about__content">
        
        <!-- Заголовок -->
        <div>
          <h2 class="title about__title">Кто <span class="title__line">мы</span></h2>
        </div>

        <!-- Описание -->
        <p class="description about__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit impedit, non exercitationem sapiente perspiciatis unde pariatur dicta incidunt nobis, minus deserunt esse. Maxime rem quaerat repellendus reiciendis accusamus debitis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit impedit, non exercitationem sapiente perspiciatis unde pariatur dicta incidunt nobis, minus deserunt esse. Maxime rem quaerat repellendus reiciendis accusamus debitis.
        </p>

        <!-- Кнопка -->
        <nuxt-link to="/" class="button about__button">Подробнее</nuxt-link>
      </div>
    </div>
  </section>
</template>