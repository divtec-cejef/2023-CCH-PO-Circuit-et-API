<template>
    <div class="intro">
        <h1>Bienvenue !</h1>
        <p>Tu n'as pas encore scanné de voiture...</p>
        <p>C'est par ici !</p>
    </div>

    <img class="qr-code" :src=qrCodeImg alt="Animation qr code">

</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import router from '@/router';

//Test si un utilisateur est déjà enregistré
const userCar = useCarStore();
if(userCar.car.idCar != undefined && userCar.car.idCar != 0) {
  router.push({ path: `/${userCar.car.idQuery}` });
}

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