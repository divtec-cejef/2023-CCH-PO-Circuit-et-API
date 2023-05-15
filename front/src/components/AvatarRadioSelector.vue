<template>
  <fieldset @change="emit('regenerateAvatar',props.avatarProperty.propNameEn, $event.target.value ?? '')">
      <legend>{{ props.avatarProperty.propNameFr }}</legend>
      <template v-for="(item, key) in props.avatarProperty.propValues" :key="key">
          <input type="radio" :name=props.avatarProperty.propNameSnakeCase :id=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase) :value=item.propValueEn :checked="props.avatarProperty.selectedValueEn === item.propValueEn">
          <label :for=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase) class="radio-avatar">{{item.propValueFr}}</label>
      </template>
  </fieldset>
</template>

<script setup lang="ts">
import type { radioProperty } from '@/models/avatar';

const props = defineProps<{avatarProperty: radioProperty}>();
console.log(props.avatarProperty);

const emit = defineEmits(['regenerateAvatar']);
</script>

<style scoped>
input[type=radio] {
    /*display: none;*/
}

.radio-avatar {
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0.5em;
    border: 2px solid #000;
    border-radius: 3px;
    cursor: pointer;
}

.radio-avatar:hover {
    background-color: #000;
    color: #fff;
}

input[type=radio]:checked + label {
    background-color: #b4b4b4;
}

fieldset {
    border: 0;
    padding: 0;
}
</style>