<template>
    <span>
        {{ props.callback ? props.callback(displayed ?? props.data) : displayed ?? props.data }}
    </span>
</template>

<script generic="T extends number | string" lang="ts" setup>
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

type T = number | string;

const props = defineProps<{
  data: T;
  callback?: (v: T) => string | number;
}>();

const displayed = typeof props.data === 'string' ? ref<string>('') : ref<number>(0);

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

  n.value = Math.ceil(( ( 1 - Math.cos(i) ) / 2 ) * ( to - from ) + from);

  requestAnimationFrame(() => animateNumber(n, to, ( i ?? 0 ) + 0.1, from));
};

const animateString = (n: Ref<string | null | undefined>, to: string, i?: number, from?: string) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzéàè\'-1234567890 !?:.,;'.split('');
  const middle = alphabet.length / 2;
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
  let newString = '';
  for (let j = 0; j < nVal.length; j++) {
    if (nVal[ j ] === to[ j ]) {
      newString += nVal[ j ];
    } else if (alphabet.indexOf(nVal[ j ]) < alphabet.indexOf(to[ j ])) {
      const characterIndex = alphabet.indexOf(nVal[ j ] ?? 'a');
      newString += alphabet[ ( characterIndex === -1 ? middle : characterIndex ) + 1 ];
    } else {
      const characterIndex = alphabet.indexOf(nVal[ j ] ?? 'a');
      newString += alphabet[ ( characterIndex === -1 ? middle : characterIndex ) - 1 ];
    }
  }

  n.value = newString;

  requestAnimationFrame(() => animateString(n, to, ( i ?? 0 ) + 0.1, from));
};

watch(() => props.data, (v, old) => {
  console.log(old);
  if (old)
    displayed.value = old;
  if (typeof v === 'string')
    animateString(displayed as Ref<string>, v);
  else
    animateNumber(displayed as Ref<number>, v);
}, { immediate: true });

</script>

<style lang="scss" scoped>

</style>
