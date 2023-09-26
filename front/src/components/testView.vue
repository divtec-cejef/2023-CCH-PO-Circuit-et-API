<template>
    <div ref="el" >
        <div>
            salut
        </div>
    </div>
    <button @click="x += 10">
        Scroll right 10px
    </button>
    <button @click="y += 10">
        Scroll down 10px
    </button>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
div {
    width: 100px;
    height: 100px;
    border: 1px solid;
    overflow: scroll;

    > div {
        height: 400px;
    }
}
</style>