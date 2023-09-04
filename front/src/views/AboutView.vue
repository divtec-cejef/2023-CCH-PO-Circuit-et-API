<template>
    <div>
        <h1>À propos</h1>
        <p>Le projet a été créé par les personnes suivantes:</p>
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
        <h3>Front-end</h3>
        <ul class="libraries">
            <li v-for="(lib, index) in frontLibs"  :key="index">
                <a :href="lib.link">
                    <span class="library-name">{{lib.name}}</span>
                    <span class="author-name">{{lib.author}}</span>
                </a>
            </li>
        </ul>
        <h3>Back-end</h3>
        <ul class="libraries">
            <li v-for="(lib, index) in backLibs"  :key="index">
                <a :href="lib.link">
                    <span class="library-name">{{lib.name}}</span>
                    <span class="author-name">{{lib.author}}</span>
                </a>
            </li>
        </ul>
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

</script>

<style lang="scss" scoped>
p {
}

ul {
  list-style: none;
  padding: 0;
  text-align: center;

  h3 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  &.students {
    li {
      ul {
        display: flex;
        flex-direction: column;
        margin: 2px auto 15px auto;

        li {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 5px;
          margin: auto;

          span {
            font-size: 1em;

            &.last-name {
              font-weight: bold;
              text-transform: uppercase;
              margin-right: 5px;
              text-align: right;
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

  &.libraries {
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
</style>
