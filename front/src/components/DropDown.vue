<template>

    <div class="button-checked">
        <label>
            <span>{{ name }}</span>
            <input type="checkbox" v-model.bool="isClicked">
            <img src="../assets/img/arrow.png" alt="Flèche dépliable" :style="{transform: `rotate(${rotateImage}deg)`}">
        </label>
    </div>

    <div class="drop-down-content" v-if="isClicked">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
defineProps(['name'])


// Retourne l'angle de l'image en fonction de si l'utilisateur a cliqué
const rotateImage = computed(() => {
    return isClicked.value ? '90' : '0'
})

let isClicked = ref(true);

</script>

<style scoped lang="scss">

div.button-checked {
    input {
        display: none;
    }

    img {
        width: 10px;
    }
}

div.drop-down-content {
    table {
        text-align: center;
    }
}

</style>