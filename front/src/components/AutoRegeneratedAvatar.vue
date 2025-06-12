<template>
  <div class="avatar">
    <v-runtime-template :template="template"/>
  </div>
</template>

<script lang="ts">
import { Avatar, genConfig } from 'holiday-avatar';
import VRuntimeTemplate from 'vue3-runtime-template';
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['avatarConfig'],
  watch: {
    avatarConfig: function (newVal) {
      this.regenerateAvatar(newVal);
    }
  },
  data() {
    const config = genConfig(this.avatarConfig);
    return {
      template: '<Avatar v-bind="{...config}" />',
      config,
    };
  },

  components: {
    // eslint-disable-next-line vue/no-unused-components
    Avatar,
    VRuntimeTemplate,
  },
  methods: {
    regenerateAvatar(newConfig: any) {
      this.config = newConfig;
      this.template = '<Avatar v-bind="{...config}" />';
    },
  }
});

</script>

<style scoped>
.avatar div {
  height: 100%;
  width: 100%;
}

</style>