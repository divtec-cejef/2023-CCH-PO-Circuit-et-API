<template>
    <div class="avatar">
        <v-runtime-template :template="template" />
    </div>

<!--    <select @change="regenerateAvatar('mouthType', $event.target.value)">-->
<!--        <option value="laugh">Rire</option>-->
<!--        <option value="smile">Sourire</option>-->
<!--        <option value="peace">Normal</option>-->
<!--    </select>-->
    <fieldset @change="regenerateAvatar('mouthType', $event.target.value)">
        <legend>Type de bouche</legend>
        <input type="radio" name="mouth-type" id="laugh" value="laugh">
        <label for="laugh" class="radio-avatar">Rire</label>

        <input type="radio" name="mouth-type" id="smile" value="smile">
        <label for="smile" class="radio-avatar">Sourire</label>

        <input type="radio" name="mouth-type" id="peace" value="peace">
        <label for="peace" class="radio-avatar">Normal</label>
    </fieldset>
    <fieldset @change="regenerateAvatar('sex', $event.target.value)">
        <legend>Genre</legend>
        <input type="radio" name="sex" id="male" value="male">
        <label for="male" class="radio-avatar">Homme</label>

        <input type="radio" name="sex" id="female" value="female">
        <label for="female" class="radio-avatar">Femme</label>
    </fieldset>
    <fieldset @change="regenerateAvatar('earSize', $event.target.value)">
        <legend>Taille d'oreilles</legend>
        <input type="radio" name="ear-size" id="small" value="small">
        <label for="small" class="radio-avatar">Petites</label>

        <input type="radio" name="ear-size" id="big" value="big">
        <label for="big" class="radio-avatar">Grandes</label>
    </fieldset>
    <fieldset @change="regenerateAvatar('eyeType', $event.target.value)">
        <legend>Type d'yeux</legend>
        <input type="radio" name="eyes-type" id="circle" value="circle">
        <label for="circle" class="radio-avatar">Ronds</label>

        <input type="radio" name="eyes-type" id="oval" value="oval">
        <label for="oval" class="radio-avatar">Ovals</label>

        <input type="radio" name="eyes-type" id="smile-eyes" value="smile">
        <label for="smile-eyes" class="radio-avatar">Plicés</label>
    </fieldset>
    <fieldset @change="regenerateAvatar('hairType', $event.target.value)">
        <legend>Type de cheveux</legend>
        <input type="radio" name="hair-type" id="normal-hair" value="normal">
        <label for="normal-hair" class="radio-avatar">Normals</label>

        <input type="radio" name="hair-type" id="thick" value="thick">
        <label for="thick" class="radio-avatar">Epais</label>

        <input type="radio" name="hair-type" id="mohawk" value="mohawk">
        <label for="mohawk" class="radio-avatar">Crête</label>

        <input type="radio" name="hair-type" id="femaleLong" value="femaleLong">
        <label for="femaleLong" class="radio-avatar">Très longs</label>

        <input type="radio" name="hair-type" id="femaleShort" value="femaleShort">
        <label for="femaleShort" class="radio-avatar">Longs</label>
    </fieldset>
    <!--  type de chapeau  -->
    <fieldset @change="regenerateAvatar('hatType', $event.target.value)">
        <legend>Type de chapeau</legend>
        <input type="radio" name="hat-type" id="none" value="none">
        <label for="none" class="radio-avatar">Aucun</label>

        <input type="radio" name="hat-type" id="beanie" value="beanie">
        <label for="beanie" class="radio-avatar">Bonnet</label>

        <input type="radio" name="hat-type" id="turban" value="turban">
        <label for="turban" class="radio-avatar">Turban</label>
    </fieldset>
    <!--  type de nez  -->
    <fieldset @change="regenerateAvatar('noseType', $event.target.value)">
        <legend>Type de nez</legend>
        <input type="radio" name="nose-type" id="short-nose" value="short">
        <label for="short-nose" class="radio-avatar">Court</label>

        <input type="radio" name="nose-type" id="long-nose" value="long">
        <label for="long-nose" class="radio-avatar">Long</label>

        <input type="radio" name="nose-type" id="round-nose" value="round">
        <label for="round-nose" class="radio-avatar">Rond</label>
    </fieldset>
    <!--  type de haut  -->
    <fieldset @change="regenerateAvatar('shirtType', $event.target.value)">
        <legend>Type de haut</legend>
        <input type="radio" name="shirt-type" id="hoody" value="hoody">
        <label for="hoody" class="radio-avatar">Pull</label>

        <input type="radio" name="shirt-type" id="short" value="short">
        <label for="short" class="radio-avatar">T-Shirt</label>

        <input type="radio" name="shirt-type" id="polo" value="polo">
        <label for="polo" class="radio-avatar">Polo</label>
    </fieldset>
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
.avatar div {
    height: 500px;
    width: 500px;
}

input[type=radio] {
    display: none;
}

.radio-avatar {
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0.5em;
    border: 2px solid #000;
    border-radius: 3px;
    cursor: pointer;
}

.radio-avatar:hover {
    background-color: #000;
    color: #fff;
}

input[type=radio]:checked + label {
    background-color: #b4b4b4;
}

fieldset {
    border: 0;
    padding: 0;
}
</style>