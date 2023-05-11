<template>
    <div class="avatar">
        <v-runtime-template :template="template" />
    </div>

<!--    <select @change="regenerateAvatar('mouthType', $event.target.value)">-->
<!--        <option value="laugh">Rire</option>-->
<!--        <option value="smile">Sourire</option>-->
<!--        <option value="peace">Normal</option>-->
<!--    </select>-->
    <div v-for="(item, key) in avatarProperties" :key="key">
        <AvatarRadioSelector :avatar-property=item @regenerateAvatar="regenerateAvatar"></AvatarRadioSelector>
    </div>

</template>

<script lang="ts">
import {Avatar, genConfig} from "holiday-avatar";
import VRuntimeTemplate from "vue3-runtime-template";
import {defineComponent} from "vue";
import AvatarRadioSelector from "@/components/AvatarRadioSelector.vue";

export default defineComponent({
        data() {
            const config = genConfig({bgColor: '#FFF', mouthType: 'laugh'})
            return {
                template: '<Avatar v-bind="{...config}"  />',
                config,
                avatarProperties: [
                    {
                        propNameFr: 'Type de bouche',
                        propNameEn: 'mouthType',
                        propNameSnakeCase: 'mouth-type',
                        propValues: [
                            {
                                propValueEn: 'laugh',
                                propValueFr: 'Rire',
                            },
                            {
                                propValueEn: 'smile',
                                propValueFr: 'Sourire',
                            },
                            {
                                propValueEn: 'peace',
                                propValueFr: 'Normal',
                            }
                        ],
                        selectedValueEn: config.mouthType
                    },
                    {
                        propNameFr: 'Genre',
                        propNameEn: 'sex',
                        propNameSnakeCase: 'sex',
                        propValues: [
                            {
                                propValueEn: 'male',
                                propValueFr: 'Homme',
                            },
                            {
                                propValueEn: 'female',
                                propValueFr: 'Femme',
                            }
                        ],
                        selectedValueEn: config.sex
                    },
                    {
                        propNameFr: 'Taille des oreilles',
                        propNameEn: 'earSize',
                        propNameSnakeCase: 'ear-size',
                        propValues: [
                            {
                                propValueEn: 'small',
                                propValueFr: 'Petites',
                            },
                            {
                                propValueEn: 'big',
                                propValueFr: 'Grandes',
                            }
                        ],
                        selectedValueEn: config.earSize
                    },
                    {
                        propNameFr: 'Type des yeux',
                        propNameEn: 'eyeType',
                        propNameSnakeCase: 'eye-type',
                        propValues: [
                            {
                                propValueEn: 'circle',
                                propValueFr: 'Ronds',
                            },
                            {
                                propValueEn: 'oval',
                                propValueFr: 'Ovals',
                            },
                            {
                                propValueEn: 'smile',
                                propValueFr: 'Plissés',
                            }
                        ],
                        selectedValueEn: config.eyeType
                    },
                    {
                        propNameFr: 'Type de cheveux',
                        propNameEn: 'hairType',
                        propNameSnakeCase: 'hair-type',
                        propValues: [
                            {
                                propValueEn: 'normal',
                                propValueFr: 'Normals',
                            },
                            {
                                propValueEn: 'thick',
                                propValueFr: 'Epais',
                            },
                            {
                                propValueEn: 'mohawk',
                                propValueFr: 'Crête',
                            },
                            {
                                propValueEn: 'femaleLong',
                                propValueFr: 'Très longs',
                            },
                            {
                                propValueEn: 'femaleShort',
                                propValueFr: 'Longs',
                            }
                        ],
                        selectedValueEn: config.hairType
                    },
                    {
                        propNameFr: 'Type de chapeau',
                        propNameEn: 'hatType',
                        propNameSnakeCase: 'hat-type',
                        propValues: [
                            {
                                propValueEn: 'none',
                                propValueFr: 'Aucun',
                            },
                            {
                                propValueEn: 'beanie',
                                propValueFr: 'Bonnet',
                            },
                            {
                                propValueEn: 'turban',
                                propValueFr: 'Turban',
                            }
                        ],
                        selectedValueEn: config.hatType
                    },
                    {
                        propNameFr: 'Type de nez',
                        propNameEn: 'noseType',
                        propNameSnakeCase: 'nose-type',
                        propValues: [
                            {
                                propValueEn: 'short',
                                propValueFr: 'Court',
                            },
                            {
                                propValueEn: 'long',
                                propValueFr: 'Long',
                            },
                            {
                                propValueEn: 'round',
                                propValueFr: 'Rond',
                            }
                        ],
                        selectedValueEn: config.noseType
                    },
                    {
                        propNameFr: 'Type de haut',
                        propNameEn: 'shirtType',
                        propNameSnakeCase: 'shirt-type',
                        propValues: [
                            {
                                propValueEn: 'hoody',
                                propValueFr: 'Sweat',
                            },
                            {
                                propValueEn: 'short',
                                propValueFr: 'T-shirt',
                            },
                            {
                                propValueEn: 'polo',
                                propValueFr: 'Polo',
                            }
                        ],
                        selectedValueEn: config.shirtType
                    },
                    {
                        propNameFr: 'Type de lunettes',
                        propNameEn: 'glassesType',
                        propNameSnakeCase: 'glasses-type',
                        propValues: [
                            {
                                propValueEn: 'none',
                                propValueFr: 'Aucunes',
                            },
                            {
                                propValueEn: 'round',
                                propValueFr: 'Rondes',
                            },
                            {
                                propValueEn: 'square',
                                propValueFr: 'Carrées',
                            }
                        ],
                        selectedValueEn: config.glassesType
                    },

                ],
            }
        },

        components: {
            AvatarRadioSelector,
            // eslint-disable-next-line vue/no-unused-components
            Avatar,
            VRuntimeTemplate,
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