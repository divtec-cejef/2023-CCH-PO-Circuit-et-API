<template>
    <QrcodeStream @decode="(r) => result = r"  />

    <div>{{ result }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader/src';

const result = ref('');
</script>

<style scoped lang="scss">

</style>