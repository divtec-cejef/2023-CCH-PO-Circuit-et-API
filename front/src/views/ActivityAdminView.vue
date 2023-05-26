<template>

    <h1>Scan des activités</h1>
    <div class="activity-list">
        <activity-admin @click="openScan"/>
        <activity-admin />
        <activity-admin />
        <activity-admin />
        <activity-admin />
    </div>
</template>

<script setup lang="ts">
import ActivityAdmin from '@/components/ActivityAdmin.vue';
import router from '@/router';
import { ref } from 'vue';

const idActivity = ref(0);

function openScan() {
  router.push({ path: '/admin/scan', query: { idActivity: idActivity.value.toString() } });
}
</script>

<style scoped lang="scss">

div.activity-list div {
    margin: 20px 0;
}
</style>