<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加歌单</div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit="isEdit ? edit() : create()">
        <q-card-section>
          <q-input
            v-model="playlist.name"
            :rules="[val => (val && val.length > 0) || '请填写歌单名称！']"
            autofocus
            dense
            label="名称"
            @keyup.enter="show = false"
          />

          <q-input
            v-model="playlist.description"
            autofocus
            dense
            label="歌单描述"
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader v-model:file="playlist.cover" label="上传歌单封面" />
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
import Uploader from '../../components/Uploader.vue';
import { reactive, ref } from 'vue';
import notify from '../../utils/notify';
import playlistApi from '../../api/playlist';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const show = ref(true);
const file = ref(null);
const isEdit = ref(Boolean(props.data));

const playlist = reactive(
  props.data || { name: '', description: '', cover: null }
);

const emmit = defineEmits(['create-success']);

const create = () => {
  playlistApi
    .create({
      name: playlist.name,
      description: playlist.description,
      coverId: playlist.cover.id
    })
    .then(created => {
      show.value = false;
      notify.success(`歌单《${created.name}》创建成功！`);
      emmit('create-success');
    })
    .catch(error => {
      notify.error(error.message);
    });
};

const edit = () => {};
</script>

<style scoped></style>
