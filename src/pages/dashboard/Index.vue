<template>
  <div class="page">
    <Uploader />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Uploader from '../../components/Uploader.vue';

export default {
  name: 'Index',
  components: { Uploader },
  setup() {
    const store = useStore();
    return {
      nickname: computed(() => store.state.user.currentUser.nickname)
    };
  }
};
</script>

<style scoped></style>
