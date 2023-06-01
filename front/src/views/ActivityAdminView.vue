<template>
    <div class="content">
        <template v-if="!loading">
            <div class="no-authentification" v-if="adminPost.token.toString().length == 0">
                <h1>Erreur</h1>
                <p>Vous n'êtes pas authentifié...</p>

                <div @click="openHome" >Accueil</div>
            </div>
            <template v-else>
                <h1>Scan des activités</h1>
                <div class="activity-list">
                    <activity-admin v-for="(activity, key) in adminPost.listActivity"
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
import restful from '@/models/api';
import { useAdminPostStore } from '@/stores/adminPost';

//Initialisation des variables
const adminPost = useAdminPostStore();
const loading = ref(true);

//Récupération des données de l'url
if(adminPost.token === '') {
  const actualUrl = router.currentRoute;
  adminPost.sectionName = (actualUrl.value.query.section || '').toString();
  adminPost.mdp = (actualUrl.value.query.mdp || '').toString();

  //Récupération du Token avec le nom et mot de passe de l'url
  restful.authenticationSectionPwd(adminPost.sectionName, adminPost.mdp).then((v) => {
    if (v.token !== undefined) {
      //Initialise les données en fonction de l'id de la section
      adminPost.token = v.token;
      adminPost.initAllActivityOneSection(1);
    }
    loading.value = false;
  });
} else {
  loading.value = false;
}

/**
 * Ouvre la page de scan en passant l'id de l'activité
 */
function openScan(idActivity: number) {
  router.push({ path: '/admin/scan', query: { idActivity: idActivity.toString() } });
}

/**
 * Ouvre la page d'accueil
 */
function openHome() {
  router.push({ path: '/' });
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