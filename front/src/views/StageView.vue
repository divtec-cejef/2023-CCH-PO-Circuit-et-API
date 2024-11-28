<template>
    <iframe class="fullscreen"
            height="480px"
            sandbox="allow-scripts allow-same-origin allow-forms"
            src="https://forms.office.com/e/eCDaaCr2AV"
            style="border: none; max-width:100%; max-height:100vh"/>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

iframe {
    margin-top: 100px;
    height: calc(100vh - var(--height-screen-diff) - 85px);
}
</style>
