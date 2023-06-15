<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
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

//Initialisation de la voiture en fonction de l'url
let userCar = useCarStore();
const { car } = userCar;

let status = userCar.initUserCarQueryId(useRouter().currentRoute.value.params.id);

//Récupère le code de réponse de l'api
let codeBackApi = ref(0);
status.then(value => codeBackApi.value = value);

const modelLoaded = ref(false);
</script>

<template>
  <div class="loading" v-if="codeBackApi === api.ReturnCodes.NoCode">
    Chargement...
  </div>

  <div v-else-if="codeBackApi === api.ReturnCodes.Success">
    <div class="user-data">
      <div class="avatar-txt">
        <AutoRegeneratedAvatar :avatar-config="car.avatar"/>
        <p>Bienvenue <span>{{ car.pseudo }}</span> !<br></p>
        <p>Tu trouveras tout ce dont tu as besoin sur ces pages...</p>
      </div>

      <div class="car-3d">
        <span :class="`loading${modelLoaded?' loaded':''}`">Chargement en cours...</span>
        <div :class="modelLoaded?'':'hidden'">
          <Renderer id="car" ref="renderer" antialias
                    :orbit-ctrl="{
                           autoRotate: true,
                           autoRotateSpeed: -2.0,
                           enableDamping: true,
                           dampingFactor: 0.05
                       }"
                    width="400px" height="250px">
            <Camera :position="{ x: 1, y: 0.5, z: 0 }" :near=".01"/>
            <Scene background="#fff">
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

      <h2>Tableau de bord</h2>
      <p class="intro-badge">Clique sur n'importe quel de ces badges, ils te serviront tout au long de ta visite
        !</p>
      <div class="badges">
        <RouterLink to="/course">
          <img :src=badgeCourse alt="Badge course">
          <p>Course</p>
        </RouterLink>
        <RouterLink to="/course">
          <img :src=badgeClassement alt="Badge classement">
          <p>Classement</p>
        </RouterLink>
        <RouterLink to="/course">
          <img :src=badgeVideo alt="Badge vidéo">
          <p>Video</p>
        </RouterLink>
        <RouterLink to="/modification">
          <img :src=badgeModif alt="Badge modification">
          <p>Modifier</p>
        </RouterLink>

        <RouterLink to="/">
          <img :src=badgeStage alt="Badge inscription stage">
          <p>Stage</p>
        </RouterLink>
        <RouterLink to="/">
          <img :src=badgeLive alt="Badge live">
          <p>Live</p>
        </RouterLink>
      </div>
    </div>
  </div>


  <div class="error" v-else-if="codeBackApi === api.ReturnCodes.NotFound">
    Erreur, impossible de trouver la voiture
  </div>

  <div class="error" v-else>
    Erreur innatendue
  </div>
</template>

<style scoped lang="scss">

div.error {
  color: var(--red);
}

div.loading, div.error {
  text-align: center;
  margin: auto;
  position: absolute;
  top: 50%;
  left: calc(50% - 100px);
  width: 200px;
}

div.user-data {
  display: flex;
  flex-direction: column;
  align-items: center;

  div.avatar-txt {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;

    p:nth-child(2) {
      font-size: 18px;
    }

    p:nth-child(3) {
      width: 80%;
    }

    div.avatar {
      width: 190px;
      height: 190px;
      margin-bottom: 10px;
    }
  }

  img#avatar {
    max-width: 160px;
    margin-bottom: 20px;
  }

  canvas#car {
    margin-top: 45px;
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

    :nth-child(odd) {
      margin-left: 5px;
    }

    :nth-child(even) {
      margin-right: 5px;
    }

    :nth-child(3),
    :nth-child(4),
    :nth-child(5),
    :nth-child(6) {
      margin-top: 20px;
    }
  }
}

div.hidden {
  opacity: 0;
}

div.car-3d {
  position:relative;
  display: flex;
  flex-direction:row;
  align-items: center;
  span.loading {
    font-size: 2em;
    font-weight:bolder;
    position: absolute;

    &.loaded{
      display: none;
    }
  }
}

</style>