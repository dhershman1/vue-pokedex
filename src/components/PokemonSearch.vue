<script setup>
import SimpleTypeahead from 'vue3-simple-typeahead'
import { useSearchStore } from '../stores/search'
import Alert from './Alert.vue'

const emits = defineEmits(['selectMon'])
const searchStore = useSearchStore()
</script>

<template>
  <article>
    <h2>Search</h2>
    <button
      :disabled="searchStore.loading"
      class="ml-1 btn btn__primary"
      @click="searchStore.selectRandomMon"
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
        type="number"
        @change="el => emits('selectMon', el.target.value)"
      >
    </section>
    <transition>
      <div v-if="searchStore.errored">
        <alert
          type="error"
          text="Pokemon not found"
        />
      </div>
    </transition>
  </article>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

label {
  display: block;
}
</style>
