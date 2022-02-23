<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="username"
          autofocus
          dense
          label="用户名"
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="password"
          autofocus
          dense
          label="密码"
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="primary" label="确认" @click="createUser" />
        <q-btn v-close-popup flat label="取消" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { create } from '../../api/user.js';
import { Notify } from 'quasar';

const show = ref(true);
const username = ref('');
const password = ref('');
const emmit = defineEmits(['create-success']);
const createUser = () => {
  create({ username: username.value, password: password.value }).then(res => {
    show.value = false;
    Notify.create({
      type: 'positive',
      message: '用户创建成功！',
      position: 'top'
    });
    emmit('create-success');
  });
};
</script>

<style scoped></style>
