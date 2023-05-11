<template>
    <div>
        <v-runtime-template :template="template" />
    </div>

    <select @change="regenerateAvatar('mouthType', $event.target.value)">
        <option value="laugh">Rire</option>
        <option value="smile">Sourire</option>
        <option value="peace">Normal</option>
    </select>
</template>

<script lang="ts">
import {Avatar, genConfig} from "holiday-avatar";
import VRuntimeTemplate from "vue3-runtime-template";
import {defineComponent} from "vue";
// import colorPicker from "@/components/colorPicker.vue";
// import Verte from "verte";
export default defineComponent({
        data() {
            return {
                template: '<Avatar v-bind="{...config}"  />',
                config: genConfig({bgColor: '#FFF', mouthType: 'laugh'})
            }
        },

        components: {
            Avatar,
            VRuntimeTemplate,
            HldAvatar: Avatar
        },
        methods: {
            regenerateAvatar(parameter: string, value: any) {
                console.log(parameter, value)
                const oldConfig = this.config;
                if (parameter in oldConfig) {
                    (oldConfig as {[index:string]: any})[parameter] = value;
                }
                console.log(oldConfig)
                this.config = genConfig({bgColor: oldConfig.bgColor, hatColor: oldConfig.hatColor, faceColor: oldConfig.faceColor, hairColor: oldConfig.hairColor, shirtColor: oldConfig.shirtColor, hairColorRandom: oldConfig.hairColorRandom, sex: oldConfig.sex, earSize: oldConfig.earSize, hatType: oldConfig.hatType, eyeType: oldConfig.eyeType, hairType: oldConfig.hairType, noseType: oldConfig.noseType, mouthType: oldConfig.mouthType, shirtType: oldConfig.shirtType, eyeBrowType: oldConfig.eyeBrowType, glassesType: oldConfig.glassesType, shape: oldConfig.shape});
                this.template = '<Avatar v-bind="{...config}"  />';
            }
        }
})
</script>

<style scoped>
div {
    height: 500px;
    width: 500px;
}
</style>