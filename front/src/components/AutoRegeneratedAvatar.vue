<template>
    <div class="avatar">
        <v-runtime-template :template="template" />
    </div>

</template>

<script lang="ts">
import {Avatar, genConfig} from "holiday-avatar";
import VRuntimeTemplate from "vue3-runtime-template";
import {defineComponent} from "vue";
import type Configs from "holiday-avatar/dist/index";

export default defineComponent({
    props: ['avatarConfig'],
    watch: {
        avatarConfig: function (newVal: Configs) {
            this.regenerateAvatar(newVal);
        }
    },
    data() {
        const config = genConfig({bgColor: '#FFF', mouthType: 'laugh'})
        return {
            template: '<Avatar v-bind="{...config}"  />',
            config,
        }
    },

    components: {
        // eslint-disable-next-line vue/no-unused-components
        Avatar,
        VRuntimeTemplate,
    },
    methods: {
        regenerateAvatar(newConfig: any) {
            console.log(newConfig)
            this.config = genConfig({bgColor: newConfig.bgColor, hatColor: newConfig.hatColor, faceColor: newConfig.faceColor, hairColor: newConfig.hairColor, shirtColor: newConfig.shirtColor, hairColorRandom: newConfig.hairColorRandom, sex: newConfig.sex, earSize: newConfig.earSize, hatType: newConfig.hatType, eyeType: newConfig.eyeType, hairType: newConfig.hairType, noseType: newConfig.noseType, mouthType: newConfig.mouthType, shirtType: newConfig.shirtType, eyeBrowType: newConfig.eyeBrowType, glassesType: newConfig.glassesType, shape: newConfig.shape});
            this.template = '<Avatar v-bind="{...config}"  />';
        },
    }
})

</script>

<style scoped>
.avatar div {
    height: 500px;
    width: 500px;
}

</style>