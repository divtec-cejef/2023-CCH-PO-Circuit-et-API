<template>
    <div class="spin">
        <half-circle-spinner
                :size="60"
                color="#7f7f7f"
        />
    </div>
</template>

<script lang="ts" setup>
import { HalfCircleSpinner } from 'epic-spinners';


</script>

<style scoped lang="scss">

div.spin {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: calc(100vh - var(--height-screen-diff) - 125px - 35px);
}
</style>