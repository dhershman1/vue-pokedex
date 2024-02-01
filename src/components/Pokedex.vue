<script setup>
import { onMounted, ref } from 'vue'
import { capitalize } from 'kyanite'
import { usePokemonStore } from '../stores/pokemon'
import { useSearchStore } from '../stores/search'
import PokemonSearch from './PokemonSearch.vue'

const mon = ref(Math.floor(Math.random() * 1026))
const errored = ref(false)
const loading = ref(true)

const monStore = usePokemonStore()
const searchStore = useSearchStore()

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
  await Promise.all([
    searchStore.fetchAllMons(),
    monStore.fetchPokemon(mon.value)
  ])
  loading.value = false
})
</script>

<template>
  <h1>Pokedex</h1>
  <div class="pokedex__container">
    <article class="pokedex">
      <section class="pokedex__imgs">
        <div class="panel panel__sprite panel--right-corner">
          <img :src="monStore.currentMon.sprite">
        </div>
        <div class="panel panel__artwork panel--right-corner">
          <h2 class="mon-name">
            {{ monStore.currentMon.name }} #{{ monStore.nationalDex }}
          </h2>
          <img
            class="pl-5"
            :src="monStore.artwork"
          >
        </div>
      </section>
      <section class="pokedex__text">
        <article class="panel panel__flavor">
          <div class="panel panel__types panel--right-corner">
            <span
              v-for="monType in monStore.currentMon.types"
              :key="monType"
              :class="['type', monType]"
            >
              {{ capitalize(monType) }}
            </span>
            <span>{{ monStore.genera }}</span>
          </div>
          <p>{{ monStore.flavorText }}</p>
        </article>
      </section>
      <section class="pokedex__details">
        <article class="panel">
          <ul>
            <li><strong>Name</strong>: {{ capitalize(monStore.currentMon.name) }}</li>
            <li><strong>National Dex</strong>: {{ monStore.nationalDex }}</li>
            <li><strong>Height</strong>: {{ monStore.currentMon.height }}cm</li>
            <li><strong>Weight</strong>: {{ monStore.currentMon.weight }}kg</li>
            <li><strong>Generation</strong>: {{ monStore.generation }}</li>
            <li>
              <strong>Legendary</strong>:
              <span
                v-if="monStore.currentMon.legendary"
                class="legendary"
              >
                <vue-feather
                  type="check"
                />
              </span>
              <span
                v-else
                class="legendary"
              >
                <vue-feather type="x" />
              </span>
            </li>
          </ul>
        </article>
        <article class="panel">
          <ul>
            <li
              v-for="([statName, statLevel]) in Object.entries(monStore.currentMon.stats)"
              :key="statName"
            >
              <strong>{{ capitalize(statName) }}</strong>: {{ statLevel }}
            </li>
          </ul>
        </article>
      </section>
    </article>
    <pokemon-search @select-mon="getPokemon" />
  </div>
</template>

<style scoped>
.mon-name {
  width: 15rem;
}

ul {
  list-style-type: none;
  padding: 0.5rem;
  margin: 0;
}

li {
  border-bottom: 1px solid var(--lightgrey);
}

li:last-child {
  border: none;
}

.pokedex {
  display: grid;
  gap: 1rem;
}
.pokedex__imgs {
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 1rem;
}

.pokedex__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.legendary i {
  vertical-align: middle;
}

@media (prefers-color-scheme: light) {
  li {
    border-color: var(--dark);
  }
}

@media only screen and (max-width: 768px) {
  .mon-name {
    display: none;
  }

  .pokedex__imgs,
  .pokedex__details {
    grid-template-columns: 1fr;
  }
}
</style>
