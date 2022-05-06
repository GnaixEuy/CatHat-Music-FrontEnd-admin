<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加歌手</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editArtist() : createArtist()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            dense
            v-model="artist.name"
            label="歌手名字"
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
            @keyup.enter="show = false"
            autofocus
          />

          <q-input
            dense
            v-model="artist.remark"
            label="备注"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader v-model:file="artist.photo" label="上传歌手照片" />
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
import artistApi from '../../api/artist.js';
import notify from '../../utils/notify.js';
import Uploader from '../../components/Uploader.vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const show = ref(true);

const isEdit = ref(Boolean(props.data));

const artist = reactive(props.data || { name: '', remark: '', photo: null });

const emmit = defineEmits(['create-success', 'edit-success']);

const createArtist = () => {
  artistApi
    .create({
      name: artist.name,
      remark: artist.remark,
      photoId: artist.photo.id
    })
    .then(createdArtist => {
      show.value = false;
      notify.success(`歌手《${createdArtist.name}》创建成功！`);
      emmit('create-success');
    });
};

const editArtist = () => {
  artistApi
    .update(artist.id, {
      name: artist.name,
      remark: artist.remark,
      photoId: artist.photo.id
    })
    .then(updatedArtist => {
      show.value = false;
      notify.success(`歌手《${updatedArtist.name}》更新成功！`);
      emmit('edit-success');
    });
};
</script>

<style scoped></style>
