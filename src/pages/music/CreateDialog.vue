<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加音乐</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editMusic() : createMusic()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
            v-model="music.name"
            label="音乐名"
            autofocus
            @keyup.enter="show = false"
            outlined
          />
        </q-card-section>
        <q-card-section>
          <q-input
            autofocus
            v-model="music.description"
            label="简介"
            outlined
            @keyup.enter="show = false"
          />
        </q-card-section>

        <q-card-section>
          <artist-selection v-model:artistList="music.artistList" />
        </q-card-section>

        <q-card-section>
          <uploader v-model:file="music.file" label="上传音乐" />
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
import { reactive, ref } from 'vue';
import musicApi from '../../api/music.js';
import notify from '../../utils/notify.js';
import Uploader from '../../components/Uploader.vue';
import ArtistSelection from '../../components/ArtistSelection.vue';

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

const music = reactive(
  props.data || { name: '', description: '', file: null, artistList: [] }
);

const emmit = defineEmits(['create-success', 'edit-success']);

const createMusic = () => {
  const createMusicRequest = {
    ...music,
    fileId: music.file.id,
    artistIds:
      music.artistList.length === 0 ? [] : music.artistList.map(item => item.id)
  };
  musicApi.create(createMusicRequest).then(createdMusic => {
    show.value = false;
    notify.success(`音乐《${createdMusic.name}》创建成功！`);
    emmit('create-success');
  });
};

const editMusic = () => {
  const updateMusicRequest = {
    ...music,
    fileId: music.file.id,
    artistIds:
      music.artistList.length === 0 ? [] : music.artistList.map(item => item.id)
  };
  musicApi.update(music.id, updateMusicRequest).then(updatedMusic => {
    show.value = false;
    notify.success(`音乐《${updatedMusic.name}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
