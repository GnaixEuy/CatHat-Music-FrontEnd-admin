<template>
  <div>
    <q-uploader :url="url" style="max-width: 300px" @added="onFileAdded" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import COS from 'cos-js-sdk-v5';

const url = ref(null);
const files = ref([]);
let cos = COS({
  getAuthorization: (options, callback) => {}
});

const onFileAdded = data => {
  files.value = data;
};
</script>

<style scoped></style>
