<template>
    <div class="intro">
        <h1>Bienvenue !</h1>
        <p>Tu n'as pas encore scanné de voiture...</p>
        <p>C'est par ici !</p>
    </div>

    <img class="qr-code" src="../assets/img/qrCode.gif" alt="">


</template>

<script setup lang="ts">

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