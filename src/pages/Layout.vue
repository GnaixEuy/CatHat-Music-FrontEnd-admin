<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="toggleLeftDrawer" />

        <q-toolbar-title> 猫猫头音乐</q-toolbar-title>
        <q-space />
        <q-avatar color="teal" text-color="white"
          >{{ nicknameFirstWord }}
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered side="left"></q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Layout',
  setup() {
    const leftDrawerOpen = ref(false);

    const store = useStore();

    return {
      nicknameFirstWord: computed(() => store.getters.nicknameFirstWord),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
};
</script>

<style scoped></style>
