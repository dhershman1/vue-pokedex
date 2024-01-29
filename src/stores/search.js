import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const baseURL = 'https://pokeapi.co/api/v2'
  const fullMonList = ref([])
  const selectedMon = ref('')

  async function fetchAllMons () {
    const { data: mons } = await axios.get(`${baseURL}/pokemon?limit=10000&offset=0`)

    fullMonList.value = mons.results
  }

  return {
    fullMonList,
    fetchAllMons,
    selectedMon
  }
})
