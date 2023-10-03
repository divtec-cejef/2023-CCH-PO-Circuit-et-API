<template>
    <div>
        <h1>À propos</h1>
        <h2>Apprentie-s</h2>
        <ul class="students">
            <li>
                <h3 class="section-name">Section informatique</h3>
                <ul>
                    <li>
                        <span class="last-name">Beuchat</span>
                        <span class="first-name">Odin</span>
                    </li>
                    <li>
                        <span class="last-name">Glauser</span>
                        <span class="first-name">Tobias</span>
                    </li>
                    <li>
                        <span class="last-name">Renaud</span>
                        <span class="first-name">Chloé</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section électronique</h3>
                <ul>
                    <li>
                        <span class="last-name">Michel</span>
                        <span class="first-name">Gaëtan</span>
                    </li>
                    <li>
                        <span class="last-name">Gigandet</span>
                        <span class="first-name">Jules</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section laborantins</h3>
                <ul>
                    <li>
                        <span class="last-name">Ben Amara</span>
                        <span class="first-name">Yannis</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section horlogerie</h3>
                <ul>
                    <li>
                        <span class="last-name">Ribeaud</span>
                        <span class="first-name">Robin</span>
                    </li>
                    <li>
                        <span class="last-name">Salgado Mouzo</span>
                        <span class="first-name">Julian</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section dessin microtechnique</h3>
                <ul>
                    <li>
                        <span class="last-name">Buchwalder</span>
                        <span class="first-name">Arthur</span>
                    </li>
                    <li>
                        <span class="last-name">Meli</span>
                        <span class="first-name">Rio</span>
                    </li>
                    <li>
                        <span class="last-name">Lachat</span>
                        <span class="first-name">Nathan</span>
                    </li>
                    <li>
                        <span class="last-name">Bergé</span>
                        <span class="first-name">Constantin</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section micromécanique</h3>
                <ul>
                    <li>
                        <span class="last-name">Membrez</span>
                        <span class="first-name">Loïc</span>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Section automatique</h3>
                <ul>
                    <li>
                        <span class="last-name">Greppin</span>
                        <span class="first-name">Raphaël</span>
                    </li>
                    <li>
                        <span class="last-name">Chèvre</span>
                        <span class="first-name">Mathieu</span>
                    </li>
                </ul>
            </li>
        </ul>
        <h2>Le projet</h2>
        <p>
            Dans le cadre des portes ouvertes 2023 de la division technique à Porrentruy,
            un projet impliquant les différentes sections de l'école a été lancé il y a 7 mois.
            L'objectif était de créer un système ludique pour encourager les visiteurs à explorer
            les différentes sections du bâtiment.
            Le résultat de ce travail est Tuture Divtec,
            une petite voiture en bois produite par les dessinateurs de l'école.
        </p>

        <p>
            Les apprentis automaticiens ont conçu et géré le circuit de la voiture,
            tandis que les électroniciens ont installé les cellules de chronométrage et les accélérateurs magnétiques,
            qui offrent des bonus aux visiteurs lorsqu'ils passent par leur atelier.
            Les informaticiens ont pris en charge le scan de chaque voiture dans les différentes sections,
            la gestion d'un site web dédié aux données des visiteurs et la partie vidéo de la course.
        </p>

        <p>
            Enfin, les horlogers et les laborantins ont ajouté des bonus physiques à la voiture,
            respectivement un appui-tête et une peinture spéciale.
            Ce projet vise à rendre la visite des sections techniques plus interactive et amusante pour les visiteurs.
        </p>
        <h2>Librairies</h2>
        <p>Merci aux auteurs des librairies utilisées sur ce site,
            qui nous fournissent des technologies très utiles:</p>
        <section class="libs">
            <div>
            <h3>Front-end</h3>
            <ul>
                <li v-for="(lib, index) in frontLibs" :key="index">
                    <div v-if="display === 'legacy'">
                        <span class="library-name">{{lib.name}}</span>
                        <span class="author-name">{{lib.author}}</span>
                    </div>
                    <a :href="lib.link" v-else>
                        <span class="library-name">{{lib.name}}</span>
                        <span class="author-name">{{lib.author}}</span>
                    </a>
                </li>
            </ul>
            </div>
            <div>
            <h3>Back-end</h3>
            <ul>
                <li v-for="(lib, index) in backLibs" :key="index">
                    <div v-if="display === 'legacy'">
                        <span class="library-name">{{lib.name}}</span>
                        <span class="author-name">{{lib.author}}</span>
                    </div>
                    <a :href="lib.link" v-else>
                        <span class="library-name">{{lib.name}}</span>
                        <span class="author-name">{{lib.author}}</span>
                    </a>
                </li>
            </ul>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";

const frontLibs: {
  link: string,
  name: string,
  author: string
}[] = [{
  link: 'https://vuejs.org',
  name: 'Vue.JS',
  author: 'Evan You'
}, {
  link: 'https://vitejs.dev',
  name: 'Vite',
  author: 'Evan You'
}, {
  link: 'https://eslint.org/',
  name: 'ESLint',
  author: 'OpenJS Foundation'
}, {
  link: 'https://sass-lang.com/',
  name: 'SCSS (Sass)',
  author: 'the Sass team'
}, {
  link: 'https://github.com/date-fns/date-fns#readme',
  name: 'date-fns',
  author: 'Sasha Koss'
}, {
  link: 'https://epic-spinners.epicmax.co/',
  name: 'Epic Spinners',
  author: 'epicmax'
}, {
  link: 'https://github.com/holiday-lab/holiday-avatar#readme',
  name: 'holiday-avatar',
  author: 'J4ck W4n9'
}, {
  link: 'https://pinia.vuejs.org/',
  name: 'Pinia',
  author: 'Eduardo San Martin Morote'
}, {
  link: 'https://threejs.org/',
  name: 'three.js',
  author: 'mrdoob'
}, {
  link: 'https://troisjs.github.io/',
  name: 'TroisJS',
  author: 'Kevin LEVRON'
}, {
  link: 'https://github.com/unshiftio/url-parse#readme',
  name: 'url-parse',
  author: 'unshiftio'
}, {
  link: 'https://vue-qrcode-reader.netlify.app',
  name: 'vue-qrcode-reader',
  author: 'Niklas Gruhn'
}, {
  link: 'https://andy-0414.github.io/vue-roller/',
  name: 'vue-roller',
  author: 'Andy-0414'
}, {
  link: 'https://router.vuejs.org/',
  name: 'Vue Router',
  author: 'Evan You'
}, {
  link: 'https://github.com/mattelen/vue3-runtime-template#readme',
  name: 'vue3-runtime-template',
  author: 'Matt Elen'
}];
frontLibs.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

const backLibs: {
  link: string,
  name: string,
  author: string
}[] = [{
  link: 'https://expressjs.com',
  name:'Express.JS',
  author: 'Express.JS foundation'
}, {
  link: 'https://prisma.io',
  name: 'Prisma DB',
  author: 'Prisma Data, Inc.'
}, {
  link: 'https://www.dotenv.org/',
  name: 'dotenv',
  author: 'Motdotla'
}, {
  link: 'https://socket.io/',
  name: 'Socket.IO',
  author: 'Damien Arrachequesne'
}, {
  link: 'https://mochajs.org/',
  name: 'Mocha',
  author: 'OpenJS Foundation'
}, {
  link: 'https://eslint.org/',
  name: 'ESLint',
  author: 'OpenJS Foundation'
}, {
  link: 'https://www.chaijs.com/',
  name: 'Chai',
  author: 'ChaiJS'
}, {
  link: 'https://nodemon.io/',
  name: 'Nodemon',
  author: '@rem'
}, {
  link: 'https://typestrong.org/ts-node/',
  name: 'ts-node',
  author: 'TypeStrong'
}];
backLibs.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

const display = useLocalStorage('display', 'modern');
</script>

<style lang="scss" scoped>
@import "@/assets/css/consts.scss";
p {
  margin-bottom: 1em;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: .5em;
}

ul {
  list-style: none;
  padding: 0;
  text-align: center;

  &.students {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;

    @media screen and (min-width: 910px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    li {
      padding: 1.5em .75em;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: $default-shadow;
      grid-column: span 2;
      width: 100%;

      @media screen and (min-width: 425px) {
      width: 90%;
      padding:  1.5em;
      }

      &:last-child:nth-child(odd) {
        @media screen and (min-width: 910px) {
          grid-column: 2 / span 2;
        }
      }

      h3 {
        margin-top: 0;
      }

      ul {
        display: flex;
        flex-direction: column;

        li {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 5px;
          margin: auto;
          padding: 0;
          box-shadow: none;

          h3 {
            margin: 0;
          }

          span {
            font-size: 1em;

            &.last-name {
              font-weight: bold;
              text-transform: uppercase;
              justify-self: end;
              text-align: right;
            }

            &.first-name {
              font-weight: normal;
              text-align: left;
              justify-self: start;
            }
          }
        }
      }
    }
  }


}

section {
  &.libs {
    display: grid;
    grid-template-columns: auto;

    @media screen and (min-width: 1000px) {
      grid-template-columns: auto auto;
      grid-auto-flow: column;
    }

    ul {
      li {
        a, div {
          display: grid;
          grid-template-columns: auto;
          transition: all 300ms ease-in-out;
          margin: auto auto 10px auto;
          padding: 1.5em;
          width: 90%;
          grid-gap: 5px;
          border-radius: 20px;
          box-shadow: $default-shadow;

          @media screen and (min-width:  530px) {
            grid-template-columns: 1fr 1fr;
            margin: auto;
            width: fit-content;
            box-shadow: none;
            padding: 0;

            span {
              &.library-name {
                font-weight: bold;
                justify-self: right;
              }

              &.author-name {
                justify-self: left;
              }
            }
          }

          span.library-name {
          font-weight: bold;
          }

          &:hover {
            color: var(--gray);
          }

          span {
            width: fit-content;
            justify-self: center;

            &.library-name {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
