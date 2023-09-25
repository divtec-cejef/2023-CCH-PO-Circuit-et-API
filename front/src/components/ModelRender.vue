<template>
    <div class="renderer-root">
        <div :style="{display: hasLoaded? 'block' : 'none'}"
             v-if="isSupported && (memory?.jsHeapSizeLimit ?? 0) / 1024 / 1024 / 1024 > 2 &&
                    display !== 'legacy'">
            <Renderer
                    id="car"
                      ref="renderer"
                      antialias
                      :orbit-ctrl="{
                                   autoRotate: true,
                                   autoRotateSpeed: 4.0,
                                   enableDamping: true,
                                   dampingFactor: 0.05
                               }"
                      :width="`${Math.min(vWidth - 30, 400)}px`"
                      :height="`${Math.min(vWidth - 30, 400) * 3/4}px`">
                <Camera :position="{ x: 1, y: .75, z: 0 }" :near=".01"/>
                <Scene :background="preferredColor === 'dark' ? '#1a1a1a' : '#fff'">
                    <PointLight :position="{x: 10}" :intensity="2"></PointLight>
                    <PointLight :position="{x: -10}" :intensity="2"></PointLight>
                    <PointLight :position="{y: 10}" :intensity="2"></PointLight>
                    <PointLight :position="{y: -10}" :intensity="2"></PointLight>
                    <PointLight :position="{z: 10}" :intensity="2"></PointLight>
                    <PointLight :position="{z: -10}" :intensity="2"></PointLight>
                    <GltfModel ref="object"
                               :src="props.model"
                               :scale="{x:.01, y:.01, z:.01}"
                               @load="() => hasLoaded = true"/>
                </Scene>
            </Renderer>
        </div>
        <div
                :style="{display: hasLoaded ? 'none' : 'flex'}"
                class="load-icon"
                v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { GltfModel, PointLight, Renderer, Scene, Camera } from 'troisjs';
import { usePreferredColorScheme, useWindowSize, useMemory, useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

const display = useLocalStorage('display', 'modern');

const props = defineProps<{
  model: string;
}>();

const hasLoaded = ref(false);

const { width: vWidth } = useWindowSize();

//Initialisation du schéma de couleur préféré
const preferredColor = usePreferredColorScheme();

const { isSupported, memory } = useMemory();
</script>

<style scoped lang="scss">
.load-icon {
  width: min(calc(100vw - 30px), 400px);
  height: calc(min(calc(100vw - 30px), 400px) * 3 / 4);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
