<template>
    <footer>
        <p>EMT, Portes ouvertes 2023</p>
        <div class="stage">Inscris toi à un stage <a href="">ici</a> !</div>
        <div>
            <a target="_blank" href="https://www.instagram.com/emtporrentruy/">
                <img :src=instaImg
                     alt="Logo instagram"></a>
            <a target="_blank" href="https://www.facebook.com/DivtecCEJEF/">
                <img :src=facebookImg
                     alt="Logo faceboook"></a>
        </div>
    </footer>
</template>

<script setup lang="ts">
import instaImg from '../assets/img/instagram.webp';
import facebookImg from '../assets/img/facebook.webp';
</script>

<style scoped lang="scss">
footer {
    bottom: 0;
    width: 100%;
    height: 65px;
    background-color: var(--gray);
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0 35px;




    p {
        font-size: 16px;
    }

    > * {
        width: 275px;
        text-align: center;
    }

    p:nth-child(1) {
        text-align: left;
    }

    div.stage {
        display: none;

        a {
            color: var(--light-green);
            font-weight: bold;
            transition: 0.1s ease-in-out;
        }

        a:hover {
            color: var(--white);
            transition: 0.1s ease-in-out;

        }
    }

    div:nth-child(3) {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: end;

        img {
            width: 25px;
        }

        img:nth-child(1) {
            margin-right: 15px;
            transition: 0.2s filter ease-in-out;
        }

        img:hover {
            filter: grayscale(8%) brightness(80%) sepia(40%) hue-rotate(50deg) saturate(300%);
            transition: 0.2s filter ease-in-out;

        }
    }
}
</style>