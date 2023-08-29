<template>
    <div class="loading-page" v-if="codeBackApi === api.ReturnCodes.NoCode">
        <SpinLoading></SpinLoading>
    </div>

    <div v-else-if="codeBackApi === api.ReturnCodes.Success">
        <div class="user-data">
            <div class="avatar-txt">
                <AutoRegeneratedAvatar :avatar-config="car.avatar"/>
                <p>Bienvenue <span>{{ car.pseudo }}</span> !<br></p>
                <p>Tu trouveras tout ce dont tu as besoin sur ces pages...</p>
            </div>

            <div class="car-3d">
                <div :class="`loading${modelLoaded?' loaded':''}`">
                    <hollow-dots-spinner
                            :dot-size="12"
                            :dots-num="3"
                            color="#7f7f7f"
                    />
                </div>
                <div :class="modelLoaded?'':'hidden'">
                    <Renderer id="car" ref="renderer" antialias
                              :orbit-ctrl="{
                           autoRotate: true,
                           autoRotateSpeed: -2.0,
                           enableDamping: true,
                           dampingFactor: 0.05
                       }"
                              width="400px" height="300px">
                        <Camera :position="{ x: 1, y: 0.5, z: 0 }" :near=".01"/>
                        <Scene :background="'#fff'">
                            <PointLight :position="{x: 10}" :intensity="2"></PointLight>
                            <PointLight :position="{x: -10}" :intensity="2"></PointLight>
                            <PointLight :position="{y: 10}" :intensity="2"></PointLight>
                            <PointLight :position="{y: -10}" :intensity="2"></PointLight>
                            <PointLight :position="{z: 10}" :intensity="2"></PointLight>
                            <PointLight :position="{z: -10}" :intensity="2"></PointLight>
                            <GltfModel ref="object" :src="carModel" :scale="{x:.01, y:.01, z:.01}"
                                       @load="() => modelLoaded = true"/>
                        </Scene>
                    </Renderer>
                </div>
            </div>

            <h2>Instructions</h2>
            <ul class="list-instruction">
                <li>
                    <NumberTime color="var(--blue)" number="1"></NumberTime>
                    <p>Balade toi dans les différentes sections du bâtiment et
                        réalise des activités pour obtenir des bonus !</p>
                </li>
                <li>
                    <NumberTime color="var(--blue)" number="2"></NumberTime>
                    <p>Modifie tes données de pilotes.</p>
                </li>
                <li>
                    <NumberTime color="var(--blue)" number="3"></NumberTime>
                    <p>Participe à la course de la DIVTEC. Plus tu auras récupéré des bonus,
                        plus tu iras vite !</p>
                </li>
                <li>
                    <NumberTime color="var(--blue)" number="4"></NumberTime>
                    <p>Analyse ton résultat et récupère la vidéo de ta course !</p>
                </li>

            </ul>

            <h2>Tableau de bord</h2>
            <div class="badges">
                <RouterLink to="/course">
                    <img :src=badgeCourse alt="Badge course">
                    <p>Course</p>
                </RouterLink>
                <RouterLink to="/classement">
                    <img :src=badgeClassement alt="Badge classement">
                    <p>Classement</p>
                </RouterLink>
                <RouterLink to="/course">
                    <img :src=badgeVideo alt="Badge vidéo">
                    <p>Video</p>
                </RouterLink>
                <RouterLink to="/pilote">
                    <img :src=badgeModif alt="Badge modification">
                    <p>Modifier</p>
                </RouterLink>

                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=p6gkJM1-REK-fgRvoEMkIDWILil6JahCo6JdgNf5EXJUMVpKQjBWOFZDT0IzRzc0QlY4RUNQTFk5SCQlQCN0PWcu"
                   target="_blank">
                    <img :src=badgeStage alt="Badge inscription stage">
                    <p>Stage</p>
                </a>
                <RouterLink to="/">
                    <img :src=badgeLive alt="Badge live">
                    <p>Live</p>
                </RouterLink>
            </div>
        </div>
    </div>

    <div class="error-no-car" v-else-if="codeBackApi === api.ReturnCodes.NotFound">
        <h2>Erreur</h2>
        <p>Malheureusement aucune voiture ne correspond à l'URL...</p>
        <RouterLink :to="`/${userCar.car.idQuery}`">
            <button>Accueil</button>
        </RouterLink>
    </div>

    <ErrorConnection v-else></ErrorConnection>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, watch } from 'vue';
import { useCarStore } from '@/stores/car';
import { useRouter } from 'vue-router';
import { GltfModel, Renderer, Camera, PointLight, Scene } from 'troisjs';
import api from '@/models/api';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import badgeCourse from '@/assets/img/course.webp';
import badgeClassement from '@/assets/img/classement.webp';
import badgeModif from '@/assets/img/modification.webp';
import badgeVideo from '@/assets/img/video.webp';
import badgeStage from '@/assets/img/stage.webp';
import badgeLive from '@/assets/img/live.webp';
import carModel from '@/assets/other/car.glb';
import SpinLoading from '@/components/SpinLoading.vue';
import { HollowDotsSpinner } from 'epic-spinners';
import ErrorConnection from '@/components/ErrorConnection.vue';
import NumberTime from '@/components/NumberTime.vue';

//Initialisation de la voiture en fonction de l'url
let userCar = useCarStore();
const { car } = userCar;
const modelLoaded = ref(false);
const codeBackApi = ref(0);

//Ecoute la route
watch(useRouter().currentRoute, async (newUrl) => {
  //Lancement de la requête de récupération seulement à l'initialisation de la page et au changement
  if (newUrl.params.id === car.idQuery) {
    codeBackApi.value = api.ReturnCodes.Success;
  }

  //Initialisation des données
  let status = userCar.initUserCarQueryId(newUrl.params.id);

  //Récupère le code de réponse de l'api
  status.then((value) => {
    if (value === undefined) {
      return;
    }

    codeBackApi.value = value;

    //Si la requête est valide alors on stocke l'id dans le localstorage
    if (codeBackApi.value == api.ReturnCodes.Success) {
      localStorage.setItem('userCarId', userCar.car.idCar.toString());
    }
  });
},
{
  deep: true,
  immediate: true
});


</script>

<style scoped lang="scss">

div.loading-page {
  height: calc(100vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}


#app div.error-no-car {
  top: calc(50% - 75px);
  left: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  text-align: center;

  h2 {
    width: 100%;
    text-align: center;
    font-size: 45px;
  }

  button {
    border: none;
    color: var(--white);
    padding: 10px;
    border-radius: 8px;
    background-color: var(--blue);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin-top: 25px;
  }

  button:hover {
    background-color: var(--white);
    border: 2px solid var(--blue);
    color: var(--black);
    transition: 0.2s ease-in-out;
  }
}

div.user-data {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  div.avatar-txt {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin-top: 20px;
    p:nth-child(2) {
      font-size: 18px;
    }

    div.avatar {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
    }
  }

  ul.list-instruction {
    max-width: 470px;
    padding-left: 17px;
    margin: 10px 0;
    list-style: none;

    p {
      text-align: left;
    }

    li:first-child {
      margin: 0;
    }

    li {
      display: flex;
      margin-top: 10px;

        p {
            margin-left: 10px;
        }
    }
  }

  img#avatar {
    max-width: 160px;
    margin-bottom: 20px;
  }

  canvas#car {
    margin-top: 60px;
    max-width: 300px;
  }

  p {
    text-align: center;

    span {
      font-weight: bold;
    }
  }

  h2 {
    align-self: start;
  }

  p.intro-badge {
    text-align: left;
    width: fit-content;
    align-self: start;
  }

  div.badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 85%;
    margin-top: 30px;

    p {
      margin: 5px 0;
    }

    img {
      width: 110px;
      height: 110px;
    }

    > :nth-child(odd) {
      margin-left: 5px;
    }

    > :nth-child(even) {
      margin-right: 5px;
    }

    :nth-child(3),
    :nth-child(4),
    :nth-child(5),
    :nth-child(6) {
      margin-top: 20px;
    }
  }

  a {

    p {
      transition: ease-in-out 0.2s;

    }

    img {
      transition: ease-in-out 0.2s;
    }
  }

  a:hover {
    img {
      filter: grayscale(0.4);
      transition: ease-in-out 0.2s;
    }

    p {
      font-weight: bold;
      transition: ease-in-out 0.2s;
    }
  }

  div.hidden {
    opacity: 0;
  }

  div.car-3d {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    div.loading {
      font-size: 2em;
      font-weight: bolder;
      position: absolute;
      width: fit-content;


      &.loaded {
        display: none;
      }
    }
  }
}


</style>
