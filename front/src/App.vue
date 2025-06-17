<template>
  <div class="layout">
    <header :class="classMenuHeader">
      <RouterLink v-if="menuIsClicked" :to="`/${userCar.car.idQuery || ''}`">
        <img :src=logoImg alt="Logo tuture divtec">
      </RouterLink>

      <div class="flex">
        <div :class="'btn ' + classMenuIcon" @click="clickMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <HeaderApp v-if="!menuIsClicked" @clickMenu="menuIsClicked = $event"></HeaderApp>
    </header>

    <header class="large">
      <RouterLink :to="`/${userCar.car.idQuery || ''}`">
        <img :src=logoImg alt="Logo grand prix de la Divtec">
      </RouterLink>
      <HeaderApp></HeaderApp>
    </header>

    <main :class="classMenuClicked">
      <RouterView v-if="hasFinishedLoading"/>
      <SpinLoading v-else-if="hasError === false" class="load-element"></SpinLoading>
      <ErrorConnection v-else></ErrorConnection>
    </main>

    <footer id="main-footer" :class="classMenuClicked">
      <FooterApp/>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
import logoImg from '@/assets/img/logo.webp';
import { useLocalStorage } from '@vueuse/core';

const HeaderApp = defineAsyncComponent(() => import('@/components/TheHeader.vue'));
const FooterApp = defineAsyncComponent(() => import('@/components/TheFooter.vue'));
const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));
const ErrorConnection = defineAsyncComponent(() => import('@/components/ErrorConnection.vue'));

function clickMenu() {
  menuIsClicked.value = !menuIsClicked.value;
}

const display = useLocalStorage('display', 'modern');
const params = location.search.slice(1).split('&');
params.forEach((item) => {
  if (item === 'display=legacy') {
    display.value = 'legacy';
  }
});

const changeValueWidthScreen = () => {
  widthScreen.value = window.innerWidth;
};

const classMenuClicked = computed(() => {
  if (widthScreen.value < LIMIT_LARGE_CONTENT) {
    return menuIsClicked.value ? 'display' : 'none';
  } else {
    return 'display';
  }
});

const classMenuHeader = computed(() => {
  return menuIsClicked.value ? 'closed thin' : 'open thin';
});

const classMenuIcon = computed(() => {
  return menuIsClicked.value ? 'not-active' : 'active';
});

onMounted(() => {
  window.addEventListener('resize', changeValueWidthScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', changeValueWidthScreen);
});

const userCar = useCarStore();
const hasFinishedLoading = ref(false);
const widthScreen = ref(0);
const LIMIT_LARGE_CONTENT = 700;
const menuIsClicked = ref(true);
const hasError = ref(false);
const router = useRouter();

changeValueWidthScreen();

const userCarId = localStorage.getItem('userCarId');
if (userCarId) {
  userCar.initUserCarId(userCarId).then((v) => {
    if (v == undefined) {
      hasError.value = true;
    }
    hasFinishedLoading.value = true;
  });
} else {
  hasFinishedLoading.value = true;
}

router.beforeEach((to) => {
  if(to.path === '/' && userCar.car.idQuery) {
    router.push(`/${userCar.car.idQuery}`);
  }
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding-top: 125px;
}

//Le contenu large est caché pour les petits écrans
.large {
  display: none;
}

.none {
  display: none !important;
}

footer#main-footer.display {
  display: flex;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: var(--white);
  overflow-y: scroll;

  img {
    height: 55px;
  }

  .img-menu {
    svg {
      width: 50px;
    }
  }

  &.closed {
    align-items: center;
  }

  &.open.thin {
    display: block;
    height: calc(100vh + 20px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
  }
}

header.closed.thin,
header.large {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  height: 100px;
}

header.large, header.closed.thin {
  position: fixed;
  top: env(safe-area-inset-top);
  left: 0;
  right: 0;
  z-index: 1000;
  overflow-y: unset;
}

.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;

  .btn {
    width: 57px;
    height: 70px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    right: 20px;
    top: calc(env(safe-area-inset-top) + 20px);

    span {
      display: block;
      width: 100%;
      border-radius: 3px;
      height: 5px;
      background: var(--gray);
      transition: all .3s;
      position: relative;
    }
  }
}

span + span {
  margin-top: 8.75px;
}

html body div header .active span {
  width: 45px !important;
}

.active span:nth-child(1) {
  width: 100%;
  animation: ease .7s top forwards;
}

.not-active span:nth-child(1) {
  width: 60%;
  animation: ease .7s top-2 forwards;
}

.active span:nth-child(2) {
  width: 100%;
  animation: ease .7s scaled forwards;
}

.not-active span:nth-child(2) {
  width: 90%;
  animation: ease .7s scaled-2 forwards;
}

.active span:nth-child(3) {
  width: 100%;
  animation: ease .7s bottom forwards;
}

.not-active span:nth-child(3) {
  width: 78%;
  animation: ease .7s bottom-2 forwards;
}

@keyframes top {
  0% { top: 0; transform: rotate(0); }
  50% { top: 13.75px; transform: rotate(0); }
  100% { top: 13.75px; transform: rotate(45deg); }
}

@keyframes top-2 {
  0% { top: 13.75px; transform: rotate(45deg); }
  50% { top: 13.75px; transform: rotate(0deg); }
  100% { top: 0; transform: rotate(0deg); }
}

@keyframes bottom {
  0% { bottom: 0; transform: rotate(0); }
  50% { bottom: 13.75px; transform: rotate(0); }
  100% { bottom: 13.75px; transform: rotate(135deg); }
}

@keyframes bottom-2 {
  0% { bottom: 13.75px; transform: rotate(135deg); }
  50% { bottom: 13.75px; transform: rotate(0); }
  100% { bottom: 0; transform: rotate(0); }
}

@keyframes scaled {
  50% { transform: scale(0); }
  100% { transform: scale(0); }
}

@keyframes scaled-2 {
  0% { transform: scale(0); }
  50% { transform: scale(0); }
  100% { transform: scale(1); }
}

.load-element {
  height: calc(100vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: var(--gray);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 35px;
}
</style>
