<template>
    <div class="fullscreen">
        <div>
            <ClassementRace/>
        </div>
    </div>
</template>

<script setup lang="ts">

import ClassementRace from '@/components/ClassementRace.vue';
</script>

<style scoped lang="scss">

div.fullscreen {
  background-color: var(--white);
  z-index: 10000;
  overflow: scroll;


  > div {
    margin: 35px auto 0 auto;
    width: 75%;
    overflow: scroll;
  }
}
</style>