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
  font-size: 12px;
  padding: 10px;
  border-radius: 200px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  margin-right: 15px;
}

</style>