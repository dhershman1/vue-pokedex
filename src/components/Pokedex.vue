<script setup>
  import { onMounted, ref } from 'vue'
  import { capitalize } from 'kyanite'
  import { usePokemonStore } from '../stores/pokemon'

  const mon = ref(1)

  const monStore = usePokemonStore()

  async function getPokemon () {
    await monStore.fetchPokemon(mon.value)
  }

  onMounted(async () => {
    await monStore.fetchPokemon(mon.value)
  })
</script>

<template>
  <h1>Pokedex</h1>
  <img :src="monStore.currentMon.sprite" />
  <section class="stats">
    <p>Name: {{ monStore.currentMon.name }}</p>
    <p>Height: {{ monStore.currentMon.height }}</p>
    <p>Weight: {{ monStore.currentMon.weight }}</p>
  </section>
  <section class="types">
    <span :class="['type', monType]" v-for="monType in monStore.currentMon.types" :key="type">
      {{ capitalize(monType) }}
    </span>
  </section>
  <input v-model="mon" @change="getPokemon" />
</template>


<style scopes>
p {
  text-transform: capitalize;
  margin: 0
}

input {
  margin-top: 1rem;
}
</style>
