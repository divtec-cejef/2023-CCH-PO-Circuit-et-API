<template>

    <h1>Scan des activités</h1>
    <div class="activity-list">
        <activity-admin v-for="(activity, key) in listActivity"
                        @click="openScan(activity.idActivity)"
                        :name="activity.name"
                        :key="key"
        />

    </div>
</template>

<script setup lang="ts">
import ActivityAdmin from '@/components/ActivityAdmin.vue';
import router from '@/router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { activity } from '@/models/activity';
import type { models } from '@/models/interface';

//Initialisation des variables
const listActivity : Ref<models.activity[]>= ref([]);

//Initialise les données en fonction de l'id de la section
activity.initAllActivityOneSection(1).then(c => listActivity.value = c);

/**
 * Ouvre la page de scan en passant l'id de l'activité
 */
function openScan(idActivity: number) {
  router.push({ path: '/admin/scan', query: { idActivity: idActivity.toString() } });
}
</script>

<style scoped lang="scss">

div.activity-list div {
    margin: 20px 0;
}
</style>