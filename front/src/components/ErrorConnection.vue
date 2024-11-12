<template>
    <div class="error-no-co">
        <h2>Erreur</h2>
        <p>Problème de connexion...</p>
        <p>Réessayez.</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

#app div.error-no-co {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - var(--height-screen-diff) - 125px - 35px);
    text-align: center;

    h2 {
        width: 100%;
        text-align: center;
        font-size: 45px;
    }
}
</style>