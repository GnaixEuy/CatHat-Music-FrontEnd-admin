<template>
  <div>
    <q-select
      v-model="selectedArtist"
      :options="artistOptions"
      fill-input
      hide-selected
      hint="请输入音乐人名字检索"
      input-debounce="0"
      label="音乐人"
      map-options
      outlined
      style="width: 250px; padding-bottom: 32px"
      use-input
      @filter="onSearch"
      @input-value="setSelectedArtist"
      @update:model-value="onUpdateModel"
    >
    </q-select>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { search } from '../api/artist.js';

const props = defineProps({
  artistList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
onMounted(() => {
  if (props.artistList.length !== 0) {
    selectedArtist.value = props.artistList[0].name;
  }
});
const emit = defineEmits(['update:artistList']);
const onUpdateModel = currentSelection => {
  const result = artists.value.filter(
    item => item.id === currentSelection.value
  );
  emit('update:artistList', result);
};
const artists = ref([]);
const artistOptions = computed(() => {
  return artists.value.map(item => {
    return { value: item.id, label: item.name };
  });
});
const selectedArtist = ref(null);
const lastSearch = ref('');
onMounted(() => {
  search({ name: '' }).then(res => {
    artists.value = res.content;
  });
});
const onSearch = (name, update, abort) => {
  if (
    !selectedArtist.value ||
    lastSearch.value === selectedArtist.value.label
  ) {
    update();
    return;
  }
  update(() => {
    lastSearch.value = selectedArtist.value.label;
    search({ name: selectedArtist.value.label })
      .then(res => {
        artists.value = res.content;
      })
      .catch(() => {
        abort();
      });
  });
};
const setSelectedArtist = value => {
  selectedArtist.value = { label: value, value: null };
};
</script>

<style scoped></style>
