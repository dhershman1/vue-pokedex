<script setup>
  import { onMounted, ref } from 'vue'
  import { capitalize } from 'kyanite'
  import { usePokemonStore } from '../stores/pokemon'
  import Card from './Card.vue'

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
  <card class="w-50">
    <template #main>
      <div class="card__img">
        <img
          :src="monStore.currentMon.sprite"
          alt="Pokemon"
        />
      </div>
      <div class="flavor-text">
        <p>{{ monStore.flavorText }}</p>
      </div>
    </template>

    <template #text>
      <article class="info">
        <section class="details">
          <p class="heading">Name:</p>
          <p>{{ monStore.currentMon.name }}</p>
          <p class="heading">Height:</p>
          <p>{{ monStore.currentMon.height }}</p>
          <p class="heading">Weight:</p>
          <p>{{ monStore.currentMon.weight }}</p>
          <p class="heading">Generation:</p>
          <p>{{ monStore.generation }}</p>
        </section>
        <section class="stats">
          <span v-for="([stat, level]) in Object.entries(monStore.currentMon.stats)" :key="stat">
            <p class="heading">{{ stat }}:</p>
            <p>{{ level }}</p>
          </span>
        </section>
      </article>
      <section class="types">
        <span :class="['type', monType]" v-for="monType in monStore.currentMon.types" :key="monType">
          {{ capitalize(monType) }}
        </span>
      </section>
    </template>
  </card>
  <label>Search for a Pokemon: </label>
  <input v-model="mon" @change="getPokemon" />
</template>


<style scopes>
.w-50 {
  width: 50%;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.heading {
  font-weight: bold;
}

p {
  text-transform: capitalize;
  margin: 0
}

input {
  margin-top: 1rem;
}
</style>
