<script setup>
  import { onMounted, ref } from 'vue'
  import { capitalize } from 'kyanite'
  import { usePokemonStore } from '../stores/pokemon'
  import Card from './Card.vue'

  const randomPokemon = Math.floor(Math.random() * 1026)
  const mon = ref(randomPokemon)
  const errored = ref(false)
  const loading = ref(true)

  const monStore = usePokemonStore()

  async function getPokemon (pokemon = null) {
    loading.value = true
    if (pokemon) {
      mon.value = pokemon
    }

    try {
      await monStore.fetchPokemon(mon.value)
      errored.value = false
    } catch (e) {
      errored.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await monStore.fetchPokemon(mon.value)
    loading.value = false
  })
</script>

<template>
  <h1>Pokedex</h1>
  <section v-if="loading">
    <p>
      Fetching Pokemon...
    </p>
    <vue-feather type="settings" animation="spin"></vue-feather>
  </section>
  <section v-else class="card__container">
    <card v-if="!errored">
      <template #actions>
        <h2>
          {{ capitalize(monStore.currentMon.name) }} #{{ monStore.nationalDex }}
        </h2>
      </template>
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
        <section class="genera">
          {{ monStore.genera }}
        </section>
        <section class="types">
          <span :class="['type', monType]" v-for="monType in monStore.currentMon.types" :key="monType">
            {{ capitalize(monType) }}
          </span>
        </section>
        <section class="details">
          <table class="mb-1">
            <tr>
              <th>National Dex</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Generation</th>
              <th>Legendary</th>
            </tr>
            <tr>
              <td>{{ monStore.nationalDex }}</td>
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
    <section v-else>
      <h2>Pokemon Not Found</h2>
    </section>
  </section>
  <section class="controls">
    <label>Search for a Pokemon: </label>
    <input v-model="mon" @change="getPokemon()" />
    <button @click="getPokemon(Math.floor(Math.random() * 1026))">Random</button>
  </section>
</template>


<style scoped>
.details,
.stats {
  display: flex;
  justify-content: center;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.heading {
  font-weight: bold;
}

h1 {
  margin-top: 0;
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
