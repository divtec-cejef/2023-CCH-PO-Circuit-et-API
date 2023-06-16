<template>
    <template v-if="!(getLocalStorage && userCar.car.idQuery == '')">
        <div class="intro">
            <h1>Bienvenue !</h1>
            <p>Tu n'as pas encore scanné de voiture...</p>
            <p>C'est par ici !</p>
        </div>

        <img class="qr-code" :src=qrCodeImg alt="Animation qr code"></template>

    <ErrorConnection v-else></ErrorConnection>
</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import router from '@/router';
import ErrorConnection from '@/components/ErrorConnection.vue';

//Test si un utilisateur est déjà enregistré
const userCar = useCarStore();
if(userCar.car.idQuery != undefined && userCar.car.idQuery != '') {
  router.push({ path: `/${userCar.car.idQuery}` });
}

const getLocalStorage = () => {
  return localStorage.getItem('userCarId');
};
</script>

<style scoped lang="scss">
div.intro {
  text-align: center;

  p:nth-child(3) {
    margin-top: 10px;
    font-weight: bold;
  }
}

img.qr-code {
  width: 200px;
  display: block;
  margin: 0 auto;
}
</style>