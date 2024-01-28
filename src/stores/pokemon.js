import axios from 'axios'
import { path } from 'kyanite'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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
  const generation = ref(1)
  const flavorText = ref('')
  const genera = ref({})
  const nationalDex = ref('')



  function pullGenFromURL (genURL) {
    const splitGen = genURL.split('/')

    generation.value = splitGen[splitGen.length - 2]
  }

  function findEnLocale (data) {
    const found = data.find(d => d.language.name === 'en')

    if (found) {
      return found
    }

    return null
  }

  function findEnFlavorText (flavorText) {
    if (!flavorText.length) {
      return ''
    }

    const found = flavorText.find(fl => fl.language.name === 'en' && fl.version.name === 'alpha-sapphire')

    if (!found) {
      return flavorText.find(fl => fl.language.name === 'en').flavor_text || flavorText[0].flavor_text
    }

    return found.flavor_text
  }

  async function fetchSpeciesData (speciesLink) {
    const species = await axios.get(speciesLink)

    return species.data
  }

  async function fetchPokemon (pokemon) {
    const { data: mon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    // const speciesData = await fetchSpeciesData(mon.species.url)

    const [speciesData] = await Promise.all([
      fetchSpeciesData(mon.species.url)
    ])

    // console.log(findBy(
    //   {
    //     'language.name': 'en',
    //     'version.name': 'alpha-sapphire'
    //   },
    //   speciesData.flavor_text_entries
    // ))

    flavorText.value = findEnFlavorText(speciesData.flavor_text_entries)
    genera.value = findEnLocale(speciesData.genera)?.genus ?? ''
    nationalDex.value = speciesData.pokedex_numbers.find(
      dex => dex.pokedex.name === 'national'
    ).entry_number

    pullGenFromURL(speciesData.generation.url)

    currentMon.name = findEnLocale(speciesData.names)?.name ?? mon.name
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
    generation,
    genera,
    flavorText,
    nationalDex,
    fetchPokemon,
    fetchSpeciesData
  }
})
