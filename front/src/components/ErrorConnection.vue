<template>
    <div class="content-error">
        <div class="error-no-co" >
            <h2>Erreur</h2>
            <p>Problème de connexion...</p>
            <p>Ressayez.</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

#app div.error-no-co {
    top: calc(50% - 75px);
    left: calc(50% - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    text-align: center;

    h2 {
        width: 100%;
        text-align: center;
        font-size: 45px;
    }
}
</style>