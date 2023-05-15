<template>
    <footer>
        <p>EMT, Portes ouvertes 2023</p>
        <div class="stage">Inscris toi à un stage <a href="">ici</a> !</div>
        <div>
            <a target="_blank" href="https://www.instagram.com/emtporrentruy/">
                <img src="@/assets/img/instagram.png"
                     alt="Logo instagram"></a>
            <a target="_blank" href="https://www.facebook.com/DivtecCEJEF/">
                <img src="@/assets/img/facebook.png"
                     alt="Logo faceboook"></a>
        </div>
    </footer>
</template>

<script setup lang="ts">

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
        }
    }
}
</style>