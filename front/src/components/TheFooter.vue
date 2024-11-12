<template>
    <p class="emt">EMT, Portes ouvertes 2024</p>
    <div class="stage">Inscris toi à un stage
        <RouterLink to="/stage">
            ici
        </RouterLink> !
    </div>
    <div class="link">
        <template v-if="display !== 'legacy'">
            <a href="https://www.instagram.com/emtporrentruy/" target="_blank">
                <img :src=instaImg
                     alt="Logo instagram">
            </a>
            <a href="https://www.facebook.com/DivtecCEJEF/" target="_blank">
                <img :src=facebookImg
                     alt="Logo faceboook">
            </a>
        </template>
        <RouterLink to="/apropos">
            A Propos
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import instaImg from '@/assets/img/instagram.webp';
import facebookImg from '@/assets/img/facebook.webp';
import {useLocalStorage} from '@vueuse/core';

const display = useLocalStorage('display', 'modern');
</script>

<style lang="scss" scoped>

p.emt {
  text-align: left;
}

.emt, .stage, .link {
  width: 275px;
  text-align: center;
  font-size: 16px;
}

.footer p:nth-child(1) {
  text-align: left;
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
    transition: 0.1s ease-in-out;

  }
}

div.link {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: end;

  img {
    width: 25px;
  }

  img:nth-child(1) {
    margin-right: 15px;
    transition: 0.2s filter ease-in-out;
  }

  img:hover {
    filter: grayscale(8%) brightness(80%) sepia(40%) hue-rotate(50deg) saturate(300%);
    transition: 0.2s filter ease-in-out;

  }

  a {
    color: var(--white);
    font-weight: bold;
    transition: all ease-in-out 0.2s;
  }

  a:hover {
    color: var(--light-green);
    transition: all ease-in-out 0.2s;
  }
}

</style>
