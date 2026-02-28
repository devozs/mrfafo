import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useShopStore = defineStore('shop', () => {
    const difficulty = ref({
        MIN_RANDOM_TIME: 1000,
        MAX_RANDOM_TIME: 5000,
    })
    const mode = ref('easy')
    const time = ref(10000)

    const propagandaLevel = ref('easy')
    const holesCount = computed(() => {
        if (propagandaLevel.value === 'easy') return 6
        if (propagandaLevel.value === 'medium') return 8
        if (propagandaLevel.value === 'high') return 10
        return 6
    })

    return {
        difficulty,
        mode,
        time,
        propagandaLevel,
        holesCount
    }
})