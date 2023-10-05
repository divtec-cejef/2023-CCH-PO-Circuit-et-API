<template>
    <div class="activity">
        {{ props.name }}
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  name: string
}>();
</script>

<style lang="scss" scoped>
@import "@/assets/css/consts.scss";

.activity {
  padding: 20px 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;

  @media screen and (prefers-color-scheme: dark) {
    background-color: var(--black);
    transition: 0.2s ease-in-out;
    box-shadow: none;
    border: $dark-border;
  }
}
</style>
