<template>
    <div class="badge-txt">
        <img :src=pathImage
             :alt="`Badge ${action}`">
        <p>{{ action }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps(['action']);

let pathImage = '../assets/img/' + ['action'] + '.png';

</script>

<style scoped lang="scss">

div.badge-txt {
  img {
    width: 110px;
    height: 110px;
  }
}
</style>