<template>
    <div class="content">
        <template v-if="!loading">
            <div class="no-authentification" v-if="adminPost.token.toString().length == 0">
                <h1>Erreur</h1>
                <p>Vous n'êtes pas authentifier...</p>

                <div>Accueil</div>
            </div>
            <template v-else>
                <h1>Scan des activités</h1>
                <div class="activity-list">
                    <activity-admin v-for="(activity, key) in listActivity"
                                    @click="openScan(activity.idActivity)"
                                    :name="activity.name"
                                    :key="key"
                    />

                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import ActivityAdmin from '@/components/ActivityAdmin.vue';
import router from '@/router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { activity } from '@/models/activity';
import type { models } from '@/models/interface';
import restful from '@/models/api';
import { useAdminPostStore } from '@/stores/adminPost';

//Initialisation des variables
const listActivity: Ref<models.activity[]> = ref([]);
const adminPost = useAdminPostStore();
const loading = ref(true);

//Récupération des données de l'url
const actualUrl = router.currentRoute;
adminPost.sectionName = (actualUrl.value.query.section || '').toString();
adminPost.mdp = (actualUrl.value.query.mdp || '').toString();

//Récupération du Token avec le nom et mot de passe de l'url
restful.authenticationSectionPwd(adminPost.sectionName, adminPost.mdp).then((v) => {
  if (v.token !== undefined) {
    //Initialise les données en fonction de l'id de la section
    adminPost.token = v.token;
    activity.initAllActivityOneSection(1).then(c => listActivity.value = c);
  }
  loading.value = false;
});

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

div.content {
    height: calc(100vh - var(--height-screen-diff));
}
div.no-authentification {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - var(--height-screen-diff));

  div {
    background-color: var(--white);
    border: none;
    padding: 20px;
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    margin-top: 20px;
    transition: 0.2s ease-in-out;
  }

  div:hover {
    background-color: var(--gray);
    color: var(--white);
    transition: 0.2s ease-in-out;
  }
}
</style>