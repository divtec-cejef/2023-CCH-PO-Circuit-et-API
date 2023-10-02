<template>
    <fieldset class="rd-property">
        <div class="img-avatar">
            <img v-if="!isPhone"
                :src="imgRd?.default"
                 :alt="`Icon changeant l'avatar ${props.property.propNameFr}`">
        </div>
        <div class="rdbt-choice">
            <template v-for="item in props.property.propValues" :key="item.label">
                <input type="radio"
                       :name="`${props.property.propNameSnakeCase}`"
                       :id="`${props.property.propNameSnakeCase}-${item.value}`"
                       :value=item.value
                       :checked="props.property.selectedValue === item.value"
                        @click.capture="(e) => {
                          const current = props.property;
                          current.selectedValue = item.value;
                          emit('update:property', current);
                        }">
                <label :for="`${props.property.propNameSnakeCase}-${item.value}`"
                       class="radio-avatar">{{ item.label }}</label>
            </template>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import type { models } from '@/models/avatar';
import { ref } from 'vue';

const props = defineProps<{
    property: models.RadioProperty
    isPhone : boolean
}>();

const emit = defineEmits<{
  (e: 'update:property', property: models.RadioProperty): void;
}>();
const imgRd = ref();

//Importation de l'image de selector
async function importImage() {
  return await import(`../assets/img/${props.property.propNameSnakeCase}.webp`);
}

//Importation de l'image
importImage().then((v) => {
  imgRd.value = v;
});

</script>

<style scoped lang="scss">
@import "@/assets/css/consts";

input[type=radio] {
  display: none;
}

.radio-avatar {
  display: inline-block;
  padding: 0.5em 1em;
  margin: 0.5em;
  box-shadow: $default-shadow;
  border-radius: 3px;
  cursor: pointer;
}

.radio-avatar:hover {
  background-color: var(--blue);
  color: var(--white);
}

input[type=radio]:checked + label {
  background-color: #b9b9b9;
  color: var(--black);
}

fieldset {
  width: 100%;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border: 0;
  padding: 0;

  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  div.img-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  div.rdbt-choice {
    width: fit-content;
  }
}
</style>
