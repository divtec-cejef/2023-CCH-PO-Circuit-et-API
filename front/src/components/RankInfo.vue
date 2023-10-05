<template>
    <div class="rank">
        <span>Rang</span>
        <div>
            <span>#</span>
            <span>{{ props.rank }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  rank : number;
}>();
</script>

<style scoped lang="scss">
div.rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
  border-radius: 200px;
  padding: 14px;
  margin-top: 5px;
  margin-left: 10px;
  background-color: var(--dark-green);
  color: var(--white);
  width: 90px;
  height: 90px;

  > span {
    font-size: 12px;
    margin-bottom: -6px;
  }

  div {
    display: flex;
    align-items: center;

    span:nth-child(1) {
      font-size: 17px;
    }

    span:nth-child(2) {
      font-size: 35px;
      margin-top: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>