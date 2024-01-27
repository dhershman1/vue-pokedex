<script setup>
  import { onMounted, ref } from 'vue'
  import { capitalize } from 'kyanite'
  import { usePokemonStore } from '../stores/pokemon'
  import Card from './Card.vue'

  const randomPokemon = Math.floor(Math.random() * 1026)
  const mon = ref(randomPokemon)

  const monStore = usePokemonStore()

  async function getPokemon (pokemon = null) {
    if (pokemon) {
      mon.value = pokemon
    }

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
      <section class="types">
        <span :class="['type', monType]" v-for="monType in monStore.currentMon.types" :key="monType">
          {{ capitalize(monType) }}
        </span>
      </section>
      <section class="details">
        <table class="mb-1">
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Generation</th>
            <th>Legendary</th>
          </tr>
          <tr>
            <td>{{ monStore.currentMon.name }}</td>
            <td>{{ monStore.currentMon.height }}cm</td>
            <td>{{ monStore.currentMon.weight }}kg</td>
            <td>{{ monStore.generation }}</td>
            <td>
              <vue-feather type="check" v-if="monStore.currentMon.legendary" />
              <vue-feather type="x" v-else></vue-feather>
            </td>
          </tr>
        </table>
      </section>
      <section class="stats">
        <table>
          <tr>
            <th v-for="s in Object.keys(monStore.currentMon.stats)">{{ s }}</th>
          </tr>
          <tr>
            <td v-for="level in Object.values(monStore.currentMon.stats)">{{ level }}</td>
          </tr>
        </table>
      </section>
    </template>
  </card>
  <label>Search for a Pokemon: </label>
  <input v-model="mon" @change="getPokemon()" />
  <button @click="getPokemon(Math.floor(Math.random() * 1026))">Random</button>
</template>


<style scopes>
.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.heading {
  font-weight: bold;
}

th, td {
  text-transform: capitalize;
  padding: 0.5rem;
  border: 1px solid var(--lightgrey);
  text-align: center;
}

input {
  margin-top: 1rem;
}

table {
  border-collapse: collapse;
}

@media (prefers-color-scheme: light) {
  th, td {
    border-color: var(--char);
  }
}
</style>
