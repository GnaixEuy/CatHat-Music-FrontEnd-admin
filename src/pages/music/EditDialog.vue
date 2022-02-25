<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">编辑音乐</div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit="editMusic()">
        <q-card-section>
          <q-input
            v-model="music.name"
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
            autofocus
            dense
            label="音乐名"
            @keyup.enter="show = false"
          />

          <q-input
            v-model="music.description"
            autofocus
            dense
            label="简介"
            @keyup.enter="show = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="保存" type="submit" />
          <q-btn v-close-popup flat label="取消" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { update } from '../../api/music.js';
import notify from '../../utils/notify.js';

const show = ref(true);
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
const music = reactive({
  name: props.data.name,
  description: props.data.description
});
const id = ref(props.data.id);
const emmit = defineEmits(['edit-success']);
const editMusic = () => {
  update(id.value, music).then(updatedMusic => {
    show.value = false;
    notify.success(`音乐《${updatedMusic.name}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
