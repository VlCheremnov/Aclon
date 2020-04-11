<template>
  <!-- Слайд -->
  <section>

    <!-- Блок "Партнерство" -->
    <div class="container_full partnership-layout">

      <!-- Основное содержимое -->
      <div class="partnership-content">

        <!-- Блок конента -->
        <div class="partnership-production partnership-content__side-block">
          <div>
            <h4 class="partnership-content__title">Купить продукцию</h4>

            <nuxt-link class="partnership-content__link" to="/">В магазин</nuxt-link>
          </div>
        </div>

        <!-- Блок конента -->
        <div class="partnership-advantages partnership-content__side-block">

          <!-- Заголовок -->
          <h4 class="partnership-content__title">Работать с нами</h4>

          <!-- Список преимуществ -->
          <ul class="partnership-advantages__list">

            <!-- Элемент списка -->
            <li 
              v-once
              v-for="(item, index) in advantages"
              :key="`advantages-${index}`"

              class="partnership-advantages__item"
            >

              <!-- Заголовок элемента -->
              <h6 class="partnership-advantages__title">{{item.title}}</h6>
              <!-- Описание элемента -->
              <div class="partnership-advantages__description">{{item.description}}</div>
            </li>
            <!-- Конец элемента -->
          </ul>
          <!-- Конец списка -->

        </div>

      </div>
      <!-- Конец основного содержимого -->

      <!-- Изображение -->
      <div class="container partnership-layout__image-wrapper">
        <div class="partnership-layout__image"></div>
      </div>

      <!-- Кнопка -->
      <nuxt-link to="/" class="button partnership-layout__button">Стать партером</nuxt-link>
      
    </div>
  </section>
</template>

<script>

export default {
  data: () => ({
    advantages: [
      {
        title: 'Проверка',
        description: 'Ознакомьтесь с нашей продукцией'
      },
      {
        title: 'Качество',
        description: 'Убедитесь в качестве и полезных свойствах продукции'
      },
      {
        title: 'Подготовка',
        description: 'Поможем сформировать собственную команду'
      },
      {
        title: 'Начало работы',
        description: 'Начните сотрудничество с компанией Aclon'
      },
    ]
  })
}

</script>