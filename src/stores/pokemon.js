import axios from 'axios'
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  const currentMon = reactive({
    name: '',
    types: [],
    sprite: '',
    weight: 0,
    height: 0
  })

  async function fetchPokemon (pokemon) {
    const mon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    console.log(mon.data)

    currentMon.name = mon.data.name
    currentMon.sprite = mon.data.sprites.front_default
    currentMon.types = mon.data.types.map(({ type }) => type.name)
    currentMon.weight = mon.data.weight
    currentMon.height = mon.data.height

    return mon.data
  }

  return {
    currentMon,
    fetchPokemon
  }
})
