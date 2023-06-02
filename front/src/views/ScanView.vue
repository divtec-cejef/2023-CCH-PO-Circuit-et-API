<template>
    <div>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>

        <QrcodeStream @decode="onDecode"  />
    </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader/src';
import { ref } from 'vue';

const result = ref();

/**
 * Récupère la valeur du scan
 * @param resultScan
 */
function onDecode(resultScan:any) {
  result.value = resultScan;
}

defineExpose({
  result : result
});

</script>

<style scoped>

</style>
