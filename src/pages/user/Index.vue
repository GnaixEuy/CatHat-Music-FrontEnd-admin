<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" />
    </div>
    <q-table :columns="columns" :rows="data" hide-pagination row-key="name" />
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        color="grey-8"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { search } from '../../api/user.js';

export default {
  name: 'Index',
  setup() {
    const columns = [
      {
        label: 'ID',
        field: 'id'
      },
      {
        field: 'username',
        label: '用户名'
      },
      {
        field: 'nickname',
        label: '昵称'
      }
    ];
    const data = ref([]);
    const fetchData = () => {
      search({ page: 0, size: 5 }).then(res => {
        console.log(res.data);
        data.value = data.value.concat(res.data.records);
        pagination.value.page = res.data.number + 1;
        pagination.value.rowsPerPage = res.data.size;
        pagination.value.rowsNumber = res.data.total;
      });
    };
    fetchData();
    const pagination = ref({
      page: 2,
      rowsPerPage: 10,
      rowsNumber: 10
    });
    const rows = [];
    return {
      columns,
      pagination,
      rows,
      pagesNumber: computed(() =>
        Math.ceil(rows.length / pagination.value.rowsPerPage)
      ),
      data
    };
  }
};
</script>

<style scoped></style>
