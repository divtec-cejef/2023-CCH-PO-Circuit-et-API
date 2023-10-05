

<template>
    <div ref="roadContainer" class="road-container">
        <svg :width="width"
             color-interpolation-filters="sRGB" height="80"
             xmlns="http://www.w3.org/2000/svg">
            <path :d="`M0 40 L${width} 40`" stroke="#7f7f7f" stroke-width="80"/>
            <path :d="`M0 40 L${width} 40`" stroke="#ffc000" stroke-dasharray="21,15"
                  stroke-width="3"/>
        </svg>

        <img id="template" ref="carImage" :style="{transform:'rotate(-90deg) translatex(-10px) scale(.7)'}"
             class="road-car">

    </div>
</template>

<script lang="ts" setup>

import car1 from "@/assets/img/voiture(1).webp";
import car2 from "@/assets/img/voiture(2).webp";
import car3 from "@/assets/img/voiture(3).webp";

import { ref } from "vue";

const { width } = defineProps<{width: number}>();

const carImage = ref<HTMLImageElement | null>(null);
const roadContainer = ref<HTMLElement | null>(null);

function runCar() {
  let newCar: HTMLImageElement;
  if (carImage.value && roadContainer.value) {
    const way: "left" | "right" = Math.floor(Math.random() * 2) ? "left" : "right";
    console.log(way);
    newCar = carImage.value.cloneNode(true) as HTMLImageElement;
    roadContainer.value.appendChild(newCar);
    newCar.id = "";

    switch (Math.floor(Math.random() * 3)) {
      case 0:
        newCar.src = car1;
        newCar.alt = "voiture rouge";
        break;
      case 1:
        newCar.src = car2;
        newCar.alt = "voiture verte";
        break;
      case 2:
        newCar.src = car3;
        newCar.alt = "voiture bleue";
        break;
    }

    if (way === "right") {
      newCar.style.left = "-100px";
      newCar.style.transform = "rotate(-90deg) scale(.7) translateX(-15px) ";
    } else {
      newCar.style.left = `${width}px`;
      newCar.style.transform = "rotate(90deg) scale(.7) translateX(-45px)";
    }

    setTimeout(() => {
      if (way === "right") {
        newCar.style.left = `${width}px`;
      } else {
        newCar.style.left = "-100px";
      }
    }, 100);
    setTimeout(() => {
      if (newCar) {
        newCar.remove();
      }
    }, 10000);
  }
  setTimeout(() => {
    runCar();
  }, Math.random() * 2000 + 500);
}

runCar();

</script>

<style lang="scss" scoped>
.road-container {
  position: relative;

  .road-car {
    position: absolute;
    width: 100px;
    height: 100px;
    transition: all 7s linear;

    &#template {
      display: none;
    }
  }
}
</style>
