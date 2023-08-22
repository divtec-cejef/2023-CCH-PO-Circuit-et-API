<template>
    <div class="container">
        <div :ref="panzoomable">
            <BonusMap></BonusMap>
        </div>
    </div>

</template>

<script setup lang="ts">
import BonusMap from '@/components/BonusMap.vue';
import panzoom from 'panzoom';
import { ref } from 'vue';


const panzoomable = v => {
  panzoom(v, {
    bounds: true,
    boundsPadding: 0.6,
    maxZoom: 5,
    minZoom: 1
  });

};
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff;
}
</style>