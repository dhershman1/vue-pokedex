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
    legendary: false,
    stats: {}
  })
  const currentSpecies = ref({})
  const generation = ref(1)
  const flavorText = ref('')

  function pullGenFromURL (genURL) {
    const splitGen = genURL.split('/')

    generation.value = splitGen[splitGen.length - 2]
  }

  function findEnFlavorText (flavorText) {
    if (!flavorText.length) {
      return ''
    }

    const found = flavorText.find(fl => fl.language.name === 'en')

    if (!found) {
      return flavorText[0].flavor_text
    }

    return found.flavor_text
  }

  async function fetchSpeciesData (speciesLink) {
    const species = await axios.get(speciesLink)

    currentSpecies.value = species.data

    return species.data
  }

  async function fetchPokemon (pokemon) {
    const { data: mon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    // const speciesData = await fetchSpeciesData(mon.species.url)

    const [speciesData] = await Promise.all([
      fetchSpeciesData(mon.species.url)
    ])

    flavorText.value = findEnFlavorText(speciesData.flavor_text_entries)

    pullGenFromURL(speciesData.generation.url)

    currentMon.name = mon.name
    currentMon.legendary = speciesData.is_legendary || speciesData.is_mythical
    currentMon.sprite = mon.sprites.front_default
    currentMon.types = mon.types.map(({ type }) => type.name)
    currentMon.weight = (mon.weight * 0.1).toFixed(2)
    currentMon.height = mon.height * 10
    currentMon.stats = mon.stats.reduce((acc, s) => {
      acc[s.stat.name] = s.base_stat

      return acc
    }, {})

    return mon
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
