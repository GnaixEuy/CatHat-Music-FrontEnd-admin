<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="toggleLeftDrawer" />

        <q-toolbar-title> 猫猫头音乐</q-toolbar-title>

        <q-space />
        <q-avatar color="teal" text-color="white"
          >{{ nicknameFirstWord }}
          <q-menu fit>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable @click="logout">
                <q-item-section>退出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above side="left">
      <q-list class="text-primary" padding>
        <q-item
          v-for="item in menuRoutes"
          :key="item.meta.title"
          v-ripple
          :active="item.name === route.name"
          :to="item.path"
          active-class="menu-active text-white"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>

          <q-item-section>{{ item.meta.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { menuRoutes } from '../router/index.js';

export default {
  name: 'Layout',
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const route = useRoute();
    return {
      nicknameFirstWord: computed(
        () => store.getters['user/nicknameFirstWord']
      ),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuRoutes,
      route,
      logout: () =>
        store.dispatch('user/logout').then(() => window.location.reload())
    };
  }
};
</script>

<style lang="sass">
.menu-active
  color: white !important
  background: #72ec23
</style>
