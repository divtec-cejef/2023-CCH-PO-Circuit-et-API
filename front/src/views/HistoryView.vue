<template>
    <div class="trois-d">
        <!--vue3d-loader filePath="../src/assets/other/car.stl"
                      :texture-image="'../src/assets/img/color.wepb'"
                      :height="400"
                      file-type="stl"
                      :background-color="'red'"
                      :scale=scale
                      :controlsOptions="{
                       enablePan,
                       enableZoom,
                       enableRotate,
                      }"
                      :rotation="rotation"
                      :camera-position="cameraPosition"
                      :camera-rotation="cameraRotation"
                      :position="position"
                      @load="onLoad()"
        /-->
    </div>
    <Slider v-model="slideValue"/>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import Slider from '@vueform/slider';

let slideValue = ref(0);

//Configuration
const enablePan = ref(true);
const enableZoom = ref(true);
const enableRotate = ref(true);
const position = { x:0, y:0, z:0 };

//const cameraRotation = { x:50, y:50, z:50 };
// const cameraPosition = { x:0, y:0, z:100 };
// const cameraRotation = { x:100, y:0, z:0 };
const rotation = ref();
rotation.value = {
  x: 0.25,
  y: 0,
  z: 0,
};
function onLoad() {
  rotate();
}
function rotate() {
  requestAnimationFrame(rotate);
  rotation.value.y -= 0.005;
}
</script>

<style scoped>
div.trois-d {
    background-color: red;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>