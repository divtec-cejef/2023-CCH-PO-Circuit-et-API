<template>
    <div>
        <h1>À propos</h1>
        <p>Dans le cadre des portes ouvertes 2023 de la division technique à Porrentruy,
            un projet impliquant les sections principales de l'école a été mis en place.
        </p>
        <p>
            Le but étant de proposer un système ludique pour que les visiteurs aient un avantage à visiter
            les différentes sections du bâtiment.
            Dans cet esprit, un groupe d'apprentis représentant chacun leur section ont commencé à travailler ensemble
            il y a maintenant 7 mois pour élaborer une solution.
            Et c'est de ce travail qu'est sorti Tuture Divtec.
        </p>
        <p>
            Les dessinateurs ont dessiner et imaginer la petite voiture en bois, produite entièrement dans leur atelier.
            Les apprentis automaticien ont créé et gérer entièrement le circuit,
            les électroniciens quant à eux ont mis en place les cellules de chronométrage ainsi que les accélérateurs
            magnétiques, bonus reçu en passant dans leur atelier.
        </p>
        <p>
            Les informaticiens se sont eux occupés de gérer le scan de chaque voiture
            dans les différentes section, de ce site web dédié à la modification et consultation des données pour les visiteurs
            ainsi qu'a la partie vidéo de la course.
        </p>
        <p>
            Les horlogers et laborantins ont quant à eux amener leur touche en apportant des bonus physique à la voiture,
            respectivement un ---- et une peinture.
        </p>
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
                        <span class="first-name">jules</span>
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
        <h2>Librairies</h2>
        <p>Merci aux auteurs des librairies utilisées sur ce site,
            qui nous fournissent des technologies très utiles:</p>
        <section class="libs">
            <div>
            <h3>Front-end</h3>
            <ul>
                <li v-for="(lib, index) in frontLibs"  :key="index">
                    <a :href="lib.link">
                        <span class="library-name">{{lib.name}}</span>
                        <span class="author-name">{{lib.author}}</span>
                    </a>
                </li>
            </ul>
            </div>
            <div>
            <h3>Back-end</h3>
            <ul>
                <li v-for="(lib, index) in backLibs"  :key="index">
                    <a :href="lib.link">
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
  link: 'vue-qrcode-reader.netlify.app',
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

</script>

<style lang="scss" scoped>
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

    li {
      padding:  1.5em;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: 0 10px 10px lightgray;

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
            }

            &.first-name {
              font-weight: normal;
              text-align: left;
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
    grid-template-columns: auto auto;

    ul {
      li {
        a {
          display: grid;
          grid-template-columns: 1fr 1fr;
          transition: all 300ms ease-in-out;
          margin: auto;
          width: fit-content;
          grid-gap: 5px;

          &:hover {
            color: var(--gray);
          }

          span {
            width: fit-content;

            &.library-name {
              font-weight: bold;
              justify-self: right;
            }

            &.author-name {
              justify-self: left;
            }
          }
        }
      }
    }
  }
}
</style>
