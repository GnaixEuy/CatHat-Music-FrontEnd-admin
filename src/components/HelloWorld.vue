<script setup>
import {ref} from 'vue'

const count = ref(0)
const message = ref("猫猫头音乐后台")

const hi = () => {
  message.value = '已请求'
}

</script>

<template>
  <h1>{{ message }}</h1>
  <q-btn color="primary" label="Primary" @click="count++">点击次数: {{ count }}</q-btn>
  <br>
  <br>
  <q-btn color="primary" label="Primary" @click="hi">请求接口</q-btn>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
