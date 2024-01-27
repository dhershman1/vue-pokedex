import axios from 'axios'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  const currentMon = reactive({
    name: '',
    types: [],
    sprite: '',
    weight: 0,
    height: 0,
    stats: {}
  })
  const currentSpecies = ref({})
  const generation = ref(1)
  const flavorText = ref('')

  function pullGenFromURL (genURL) {
    const splitGen = genURL.split('/')

    generation.value = splitGen[splitGen.length - 2]
  }

  async function fetchSpeciesData (speciesLink) {
    const species = await axios.get(speciesLink)

    currentSpecies.value = species.data
    flavorText.value = species.data.flavor_text_entries[0].flavor_text

    return species.data
  }

  async function fetchPokemon (pokemon) {
    const mon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const speciesData = await fetchSpeciesData(mon.data.species.url)

    pullGenFromURL(speciesData.generation.url)

    currentMon.name = mon.data.name
    currentMon.sprite = mon.data.sprites.front_default
    currentMon.types = mon.data.types.map(({ type }) => type.name)
    currentMon.weight = mon.data.weight
    currentMon.height = mon.data.height
    currentMon.stats = mon.data.stats.reduce((acc, s) => {
      acc[s.stat.name] = s.base_stat

      return acc
    }, {})

    return mon.data
  }

  return {
    currentMon,
    currentSpecies,
    generation,
    flavorText,
    fetchPokemon,
    fetchSpeciesData
  }
})
