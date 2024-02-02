import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { step, uniform } from 'randoscando'
import { usePokemonStore } from './pokemon'

export const useSearchStore = defineStore('search', () => {
  const pokeStore = usePokemonStore()
  const baseURL = 'https://pokeapi.co/api/v2'
  const fullMonList = ref([])
  const selectedMon = ref('')
  const loading = ref(false)
  const errored = ref(false)

  async function selectRandomMon () {
    loading.value = true
    errored.value = false
    const mon = step(uniform(fullMonList.value), new Date().getMilliseconds())

    await pokeStore.fetchMonByUrl(mon[0].url)

    loading.value = false
    return mon
  }

  async function fetchAllMons () {
    const { data: mons } = await axios.get(`${baseURL}/pokemon?limit=10000&offset=0`)

    fullMonList.value = mons.results
  }

  return {
    errored,
    loading,
    fullMonList,
    fetchAllMons,
    selectedMon,
    selectRandomMon
  }
})
