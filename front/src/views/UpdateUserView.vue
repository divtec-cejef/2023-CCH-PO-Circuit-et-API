<template>
    <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>

    <div v-for="(item, key) in avatarProperties" :key="key">
        <AvatarRadioSelector :avatar-property=item @regenerateAvatar="regenerateAvatar"></AvatarRadioSelector>
    </div>

</template>

<script lang="ts">
import { genConfig } from 'holiday-avatar';
import { defineComponent } from 'vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';

export default defineComponent({
  data() {
    const config = genConfig({ bgColor: '#FFF', mouthType: 'laugh' });
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
    };
  },

  components: {
    AutoRegeneratedAvatar,
    AvatarRadioSelector,
  },
  methods: {
    regenerateAvatar(parameter: string, value: any) {
      console.log(parameter, value);

      if (parameter in this.config) {
        (this.config as { [index: string]: any })[parameter] = value;
      }
      console.log(this.config);
      this.config = genConfig({
        bgColor: this.config.bgColor,
        hatColor: this.config.hatColor,
        faceColor: this.config.faceColor,
        hairColor: this.config.hairColor,
        shirtColor: this.config.shirtColor,
        hairColorRandom: this.config.hairColorRandom,
        sex: this.config.sex,
        earSize: this.config.earSize,
        hatType: this.config.hatType,
        eyeType: this.config.eyeType,
        hairType: this.config.hairType,
        noseType: this.config.noseType,
        mouthType: this.config.mouthType,
        shirtType: this.config.shirtType,
        eyeBrowType: this.config.eyeBrowType,
        glassesType: this.config.glassesType,
        shape: this.config.shape
      });

    },
  }
});
</script>

<style scoped>

</style>