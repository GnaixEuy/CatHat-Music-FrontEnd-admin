<template>
  <div class="login-page">
    <q-card class="login-form-content">
      <div class="title">猫猫头音乐后台</div>
      <q-form class="q-gutter-md" @submit="onSubmit(username, password)">
        <q-input
          v-model="username"
          :rules="[val => (val && val.length > 0) || '请输入用户名']"
          filled
          label="用户名："
          lazy-rules
        />

        <q-input
          v-model="password"
          :rules="[val => (val && val.length > 0) || '请输入密码']"
          filled
          label="密码："
          lazy-rules
          type="password"
        />

        <q-toggle v-model="accept" label="记住我" />

        <div>
          <q-btn
            class="full-width"
            color="primary"
            label="登录"
            type="submit"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const accept = ref(false);
    const username = ref('admin22');
    const password = ref('dddddd');
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const onSubmit = (username, password) => {
      store.dispatch('user/login', { username, password }).then(() => {
        store.dispatch('user/fetchCurrentUser');
        router.push({ path: route.query.redirect || '/' });
      });
    };
    return {
      accept,
      username,
      password,
      onSubmit
    };
  }
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-form-content {
    .title {
      font-size: 40px;
      text-align: center;
      margin-bottom: 50px;
    }

    width: 400px;
    padding: 20px;
  }
}
</style>
