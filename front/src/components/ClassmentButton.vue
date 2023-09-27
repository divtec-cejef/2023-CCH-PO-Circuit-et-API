<template>
    <div class="button-classement">
        <div>
            <button v-if="userCar.car.idCar !== 0"
                    class="classement-user"
                    @click="emit('scrollToUser')"
                    :style="{ backgroundImage: `url(${placeHolderImg})`}">
            </button>
            <button
                    class="classement-top"
                    @click="emit('scrollToTop')"
                    :style="{ backgroundImage: `url(${topImg})`}">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import placeHolderImg from '@/assets/img/placeholder.webp';
import topImg from '@/assets/img/top-10.webp';
import { useCarStore } from '@/stores/car';

const userCar = useCarStore();

const emit = defineEmits<{
  (e: 'scrollToUser'): void,
  (e: 'scrollToTop'): void
}>();
</script>


<style scoped lang="scss">
@import "@/assets/css/consts.scss";

.button-classement {
  width: 100%;
  margin: -35px auto 0 auto;
  display: flex;
  justify-content: end;
  position: sticky;
  top: 40px;

  div {
    background-color: var(--white);
    border-radius: 20px;
    padding: .5em;
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
    display: flex;
    align-content: center;
    justify-content: space-evenly;

    @media screen and (prefers-color-scheme: dark) {
      background-color: transparent;
      box-shadow: none;
      border: $dark-border;
    }

    button {
      background-color: transparent;
      border: none;
      border-radius: 100%;
      background-position: center;
      background-size: 30px;
      background-repeat: no-repeat;
      width: 40px;
      height: 40px;


      &.classement-top {
        margin-left: 5px;
      }

      &:hover {
        transform: scale(1.1);
        background-color: rgba(lightgray, 0.25);
      }
    }
  }
}
</style>
