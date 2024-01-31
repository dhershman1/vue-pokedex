<script setup>
import SimpleTypeahead from 'vue3-simple-typeahead'
import { useSearchStore } from '../stores/search'

const emits = defineEmits(['selectMon'])
const searchStore = useSearchStore()
</script>

<template>
  <article>
    <h2>Search</h2>

    <button
      class="ml-1 btn btn__primary"
      @click="emits('selectMon', Math.floor(Math.random() * 1026))"
    >
      Random
    </button>
    <section class="mb-1">
      <label for="pokemonSearch">Search for a Pokemon By Name:</label>
      <simple-typeahead
        id="pokemonSearch"
        class="control"
        placeholder="By Name"
        :items="searchStore.fullMonList.map(p => p.name)"
        :min-input-length="2"
        @select-item="el => emits('selectMon', el)"
      />
    </section>
    <section>
      <label for="idSearch">Search for a Pokemon By ID:</label>
      <input
        id="idSearch"
        class="mb-1 control"
        placeholder="By ID"
        @change="el => emits('selectMon', el.target.value)"
      >
    </section>
  </article>
</template>

<style scoped>
label {
  display: block;
}
</style>
