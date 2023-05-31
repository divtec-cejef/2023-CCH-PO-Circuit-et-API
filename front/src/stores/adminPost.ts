import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useAdminPostStore = defineStore('adminPost', () => {
  const sectionName: Ref<string> = ref('');
  const mdp: Ref<string> = ref('');
  const token : Ref<string> = ref('');

  return { sectionName, mdp, token };
});