<template>
    <div class="content">
        <h1>Titre 1</h1>
        <h2>Titre 2</h2>
        <h3>Titre 3</h3>
        <h4>Titre 4</h4>

        <p>Montius nos tumore inusitato quodam et novo ut rebellis et maiestati recalcitrantes Augustae per
            haec quae strepit incusat iratus nimirum quod contumacem praefectum,
            quid rerum ordo postulat ignorare dissimulantem formidine tenus iusserim custodiri.</p>

        <div class="color">
            <div class="deux"></div>
            <div class="trois"></div>
            <div class="quatre"></div>
            <div class="cinq"></div>
            <div class="six"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">



div.color {
    display: flex;
    flex-wrap: wrap;

    div {
        width: 80px;
        height: 80px;
        margin: 10px;
    }


    div.deux {
        background-color: var(--red);
    }

    div.trois {
        background-color: var(--blue);
    }

    div.quatre {
        background-color: var(--dark-green);
    }

    div.cinq {
        background-color: var(--light-green);
    }

    div.six {
        background-color: var(--black);
        align-self: center;
    }
}

</style>