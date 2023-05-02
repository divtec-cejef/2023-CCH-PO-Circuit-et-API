<template>

    <div class="button-checked">
        <label>
            <span>{{ name }}</span>
            <input type="checkbox" v-model.bool="isClicked">
        </label>
    </div>

    <div class="drop-down-content" v-if="isClicked">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
defineProps(['name'])

let isClicked = ref(true);

</script>

<style scoped lang="scss">

div.button-checked {
    input {
        display: none;
    }
}

div.drop-down-content {
    table {
        text-align: center;
    }
}

</style>