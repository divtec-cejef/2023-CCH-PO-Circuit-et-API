<template>
    <div class="content">
        <template v-if="!loading">
            <div class="no-authentification" v-if="adminPost.token == ''">
                <h1>Erreur</h1>
                <p>Vous n'êtes pas authentifié...</p>

                <div @click="openHome">Accueil</div>
            </div>
            <template v-else>
                <h1>Scan des activités</h1>
                <div class="activity-list">
                    <activity-admin v-for="(activity, key) in adminPost.listActivity"
                                    @click="openScan(activity.idActivity, activity.name)"
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

//Si quelque chose est dans l'URL suppression du token
const actualUrl = router.currentRoute;
const idSectionUrl = Number(actualUrl.value.query.id || 0);
const mdpUrl = (actualUrl.value.query.mdp || '').toString();

//Si quelque chose est dans l'URL alors, on relance une authentification
if (idSectionUrl != 0 && mdpUrl != '') {

  //Récupère le nom de la section en fonction de son id
  adminPost.getNameSectionById(idSectionUrl).then(async (v) => {

    //Récupération du Token avec le nom et mot de passe de l'URL
    let valueToken = await restful.authenticationSectionPwd(v, mdpUrl);

    //Initialise les données en fonction de l'id de la section
    if (valueToken.token != undefined) {
      adminPost.idSection = idSectionUrl;
      localStorage.setItem('idSection', (adminPost.idSection).toString());

      adminPost.token = valueToken.token;
      localStorage.setItem('tokenPost', adminPost.token);

      await adminPost.initAllActivityOneSection(adminPost.idSection);
    }
    loading.value = false;
  });

} else {
  //Chargement des données depuis le localstorage
  adminPost.token = localStorage.getItem('tokenPost') || '';
  adminPost.idSection = Number(localStorage.getItem('idSection') || 0);

  //Initialisation des données d'activités
  adminPost.initAllActivityOneSection(adminPost.idSection).then(() => {
    loading.value = false;
  });
}

/**
 * Ouvre la page de scan en passant l'id de l'activité
 */
function openScan(idActivity: number, nameActivity: string) {
  router.push(
    {
      path: '/admin/scan',
      query: {
        idActivity: idActivity.toString(),
        nameActivity: nameActivity.toString()
      }
    });
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