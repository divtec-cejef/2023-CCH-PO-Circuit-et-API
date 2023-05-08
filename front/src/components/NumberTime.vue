<template>

    <div class="number" :style="{backgroundColor: color}">
        <p>
            {{ number }}
        </p>
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    number: String,
    color: String
})
</script>

<style scoped lang="scss">


div.number {
  font-family: 'Poppins', sans-serif;
  color: var(--white);
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-radius: 200px;
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>