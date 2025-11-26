<template>
  <p class="emt">EMT, Portes ouvertes {{ currentYear }}</p>

  <div class="stage">
    Inscris toi à un stage
    <RouterLink to="/stage">ici</RouterLink> !
  </div>

  <div class="link">
    <template v-if="display !== 'legacy'">
      <a href="https://www.instagram.com/emtporrentruy/" target="_blank">
        <img :src="instaImg" alt="Logo instagram">
      </a>
      <a href="https://www.facebook.com/DivtecCEJEF/" target="_blank">
        <img :src="facebookImg" alt="Logo facebook">
      </a>
    </template>
    <RouterLink to="/apropos">A Propos</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import instaImg from '@/assets/img/instagram.webp';
import facebookImg from '@/assets/img/facebook.webp';
import { useLocalStorage } from '@vueuse/core';

const display = useLocalStorage('display', 'modern');
const currentYear = ref(new Date().getFullYear());
</script>


<style lang="scss" scoped>
div.link {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: end;

  img {
    width: 25px;
    display: none; // masqué par défaut (desktop)
    margin-right: 15px;
    transition: 0.2s filter ease-in-out;
  }

  img:hover {
    filter: grayscale(8%) brightness(80%) sepia(40%) hue-rotate(50deg) saturate(300%);
  }

  @media (max-width: 768px) {
    img {
      display: inline-block;
    }
  }

  a {
    color: var(--white);
    font-weight: bold;
    transition: all ease-in-out 0.2s;
  }

  a:hover {
    color: var(--light-green);
  }
}

p.emt {
  text-align: left;
}

.emt, .stage, .link {
  width: 275px;
  text-align: center;
  font-size: 16px;
}

div.stage {
  display: none;

  a {
    color: var(--light-green);
    font-weight: bold;
    transition: 0.1s ease-in-out;
  }

  a:hover {
    color: var(--white);
  }
}
</style>
