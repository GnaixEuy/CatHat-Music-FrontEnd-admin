<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">推荐歌手</div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit="recommend()">
        <q-card-section>
          <q-input
            v-model="artist.recommendFactor"
            :rules="[val => val >= 0 || '请输入推荐因数']"
            autofocus
            dense
            label="推荐因数"
            @keyup.enter="show = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="确认" type="submit" />
          <q-btn v-close-popup flat label="取消" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

import artistApi from '../../api/artist.js';
import notify from '../../utils/notify.js';

const show = ref(true);

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const artist = ref(props.data || { id: null, recommendFactor: null });

const emmit = defineEmits(['success']);

const recommend = () => {
  artistApi
    .recommend(artist.value.id, artist.value.recommendFactor)
    .then(res => {
      notify.success('歌手推荐成功！');
      emmit('success', res);
      show.value = false;
    });
};
</script>

<style scoped></style>
