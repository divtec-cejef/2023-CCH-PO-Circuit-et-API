<template>
    <h1>Classement</h1>
    <p>Ici tu vois tout les temps des pilotes !</p>

    <div class="classement">
        <ClassementRace />
    </div>
</template>

<script setup lang="ts">

import ClassementRace from '@/components/ClassementRace.vue';


</script>

<style scoped lang="scss">

.classement {
    margin-top: 20px;
}
</style>