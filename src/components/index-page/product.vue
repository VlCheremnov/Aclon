<template>
  <!-- Слайд -->
  <section>

    <!-- Блок с описанием товара -->
    <div class="product-slide">

      <!-- Заголовок -->
      <h2 class="title title_center" data-y="-130">Наш <span class="title__line">продукт</span></h2>

      <!-- Основное содержимое -->
      <div class="product-slide__content">

        <!-- Описание -->
        <p class="description product-slide__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde vel ipsum culpa enim error porro nemo. Corporis a commodi vel sapiente qui iusto, ipsa, sequi voluptatibus ad repudiandae ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt neque earum aut ex, debitis molestiae temporibus ducimus voluptate repellat animi fugiat, sapiente id excepturi ut ratione quae illum ipsum commodi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum sunt facere eum tempore asperiores, dolore inventore ad voluptatum obcaecati libero fuga dolor quam quo autem reprehenderit hic porro harum sint.
        </p>

        <!-- Изображение -->
        <div class="product-slide__image" data-alpha data-x="10"></div>
      </div>
      <!-- Конец основного содержимого -->

      <!-- Кнопка -->
      <div data-y="-300"><nuxt-link to="/" class="button button_center product-slide__button">Подробнее</nuxt-link></div>
    </div>
  </section>
</template>