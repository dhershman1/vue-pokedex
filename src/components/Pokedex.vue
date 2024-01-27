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
      <section class="types">
        <span :class="['type', monType]" v-for="monType in monStore.currentMon.types" :key="monType">
          {{ capitalize(monType) }}
        </span>
      </section>
      <section class="details">
        <table>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Generation</th>
          </tr>
          <tr>
            <td>{{ monStore.currentMon.name }}</td>
            <td>{{ monStore.currentMon.height }}</td>
            <td>{{ monStore.currentMon.weight }}</td>
            <td>{{ monStore.generation }}</td>
          </tr>
        </table>
      </section>
      <section class="stats">
        <table>
          <tr>
            <th v-for="s in Object.keys(monStore.currentMon.stats)" :key="s">{{ s }}</th>
          </tr>
          <tr>
            <td v-for="level in Object.values(monStore.currentMon.stats)" :key="level">{{ level }}</td>
          </tr>
        </table>
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

td,
th {
  text-transform: capitalize;
}

th {
  padding: 0.5rem;
}

td {
  padding: 0.5rem;
  border: 1px solid var(--char);
  text-align: center;
}

input {
  margin-top: 1rem;
}
</style>
