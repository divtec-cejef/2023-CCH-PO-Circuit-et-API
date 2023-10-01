<template>
    <span>
        {{displayed ?? props.data}}
    </span>
</template>

<script setup lang="ts" generic="T extends number | string">
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

type T = number | string;

const props = defineProps<{
  data: T;
}>();

const displayed = typeof props.data === 'string' ?ref<T>('') : ref<T>(0);

const animateNumber = (n: Ref<number | null | undefined>, to: number, i?: number, from?: number) => {
  if (i === undefined) {
    i = 0;
  }

  if (from === undefined) {
    from = n.value || 0;
  }

  if (i >= Math.PI) {
    n.value = to;
    return;
  }

  n.value = Math.ceil(((1-Math.cos(i))/2) * (to - from) + from);

  requestAnimationFrame(() => animateNumber(n, to, (i ?? 0) + 0.1, from));
};

const animateString = (n: Ref<string | null | undefined>, to: string, i?: number, from?: string) => {
  if (i === undefined) {
    i = 0;
  }

  if (from === undefined) {
    from = n.value || '';
  }

  if (n.value == to) {
    return;
  }

  const toLength = to.length;

  let nVal = n.value ?? '';

  if (nVal.length > toLength) {
    n.value = nVal.slice(0, nVal.length - 2);
  } else if (nVal.length < toLength) {
    n.value = nVal + 'a';
  }

  nVal = n.value ?? '';
  console.log( nVal, to );
  let newString = '';
  for (let j = 0; j < nVal.length; j++) {
    if (nVal[j] === to[j]) {
      newString += nVal[j];
      console.log('same', j, nVal[j], to[j], newString);
    } else if (nVal.charCodeAt(j) < to.charCodeAt(j)) {
      newString += String.fromCharCode((nVal.charCodeAt(j) || 97 )+ 1);
      console.log('up', j, nVal[j], to[j], newString);
    } else {
      newString += String.fromCharCode((nVal.charCodeAt(j) || 97 )- 1);
      console.log('down', j, nVal[j], to[j], newString);
    }
  }

  n.value = newString;

  requestAnimationFrame(() => animateString(n, to, (i ?? 0) + 0.1, from));
};

watch(props, (v, old) => {
  if (old)
    displayed.value = old.data;
  const { data } = v;
  if (typeof data === 'string')
    animateString(displayed as Ref<string>, data);
  else
    animateNumber(displayed as Ref<number>, data);
}, { immediate: true });

</script>

<style scoped lang="scss">

</style>
