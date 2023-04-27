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
            <div class="white"></div>
            <div class="red"></div>
            <div class="blue"></div>
            <div class="green"></div>
            <div class="gray"></div>
            <div class="yellow"></div>
            <div class="black"></div>
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

    div.white {
        background-color: var(--white);
        border: 1px solid var(--gray)
    }

    div.red {
        background-color: var(--red);
    }

    div.blue {
        background-color: var(--blue);
    }

    div.green {
        background-color: var(--dark-green);
    }

    div.black {
        background-color: var(--black);
    }

    div.gray {
        background-color: var(--gray);
    }

    div.yellow {
        background-color: var(--yellow);
    }
}

</style>