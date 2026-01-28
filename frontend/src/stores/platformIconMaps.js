import {defineStore} from 'pinia'
import {ref} from 'vue'
import {listPlatformIconMaps} from '@/api/modules/platform-icon-map-api.js'


export const usePlatformIconMapsStore = defineStore('platformIconMaps', () => {
    const platformIconMaps = ref([])

    async function fetchPlatformIconMaps() {
        const {data} = await listPlatformIconMaps()
        platformIconMaps.value = data
    }

    return {
        platformIconMaps,
        fetchPlatformIconMaps
    }
})