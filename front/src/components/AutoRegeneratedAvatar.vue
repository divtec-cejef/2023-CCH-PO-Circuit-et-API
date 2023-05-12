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
      console.log(newVal)
      this.regenerateAvatar(newVal)
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
      this.config = newConfig
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