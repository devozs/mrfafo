<template>
  <div class="relative min-h-screen font-sans bg-cyan-400 overflow-hidden flex justify-center items-center">
    <!-- Comic Dots Background Pattern (CSS) -->
    <div class="absolute inset-0 comic-bg opacity-30"></div>
    
    <!-- Main Panel -->
    <div class="relative z-10 w-full max-w-md mx-auto p-6 bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_#000] transform -rotate-1 transition-transform hover:rotate-0 duration-300">
      
      <!-- Title -->
      <div class="text-center mb-8 relative">
        <h1 class="text-5xl font-black text-yellow-300 tracking-tighter uppercase stroke-text shadow-title transform -rotate-2">
          Whack
        </h1>
        <h2 class="text-4xl font-black text-magenta-500 tracking-tight uppercase stroke-text shadow-title mt-1 transform rotate-1">
          #MrFAFO
        </h2>
      </div>

      <!-- Pollywood Level Section -->
      <div class="mb-4 p-4 bg-gray-100 border-4 border-black rounded-xl">
        <b class="block text-xl font-bold uppercase mb-3 text-black">Pollywood Level:</b>
        <div class="grid grid-cols-3 gap-2">
          <button 
            @click="changeDifficulty('easy')"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.mode === 'easy' ? 'bg-green-400 translate-y-1 shadow-none' : 'bg-white']"
          >
            Easy
          </button>
          <button 
            @click="changeDifficulty('medium')"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.mode === 'medium' ? 'bg-yellow-400 translate-y-1 shadow-none' : 'bg-white']"
          >
            Medium
          </button>
          <button 
            @click="changeDifficulty('hard')"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.mode === 'hard' ? 'bg-red-500 text-white translate-y-1 shadow-none' : 'bg-white']"
          >
            Hard
          </button>
        </div>
      </div>

      <!-- Propaganda Level Section -->
      <div class="mb-4 p-4 bg-gray-100 border-4 border-black rounded-xl">
        <b class="block text-xl font-bold uppercase mb-3 text-black">Propaganda Level:</b>
        <div class="grid grid-cols-3 gap-2">
          <button 
            @click="store.propagandaLevel = 'easy'"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.propagandaLevel === 'easy' ? 'bg-cyan-300 translate-y-1 shadow-none' : 'bg-white']"
          >
            Easy (6)
          </button>
          <button 
            @click="store.propagandaLevel = 'medium'"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.propagandaLevel === 'medium' ? 'bg-orange-400 translate-y-1 shadow-none' : 'bg-white']"
          >
            Medium (8)
          </button>
          <button 
            @click="store.propagandaLevel = 'high'"
            :class="['comic-btn py-2 text-sm font-bold uppercase transition-transform active:translate-y-1 active:shadow-none', 
                     store.propagandaLevel === 'high' ? 'bg-magenta-500 text-white translate-y-1 shadow-none' : 'bg-white']"
          >
            High (10)
          </button>
        </div>
      </div>

      <!-- Time Section -->
      <div class="mb-8 p-4 bg-gray-100 border-4 border-black rounded-xl">
        <b class="block text-xl font-bold uppercase mb-3 text-black">Time Limit:</b>
        <div class="grid grid-cols-3 gap-2">
          <label 
            :class="['comic-btn py-2 text-center text-sm font-bold cursor-pointer transition-transform active:translate-y-1 active:shadow-none', 
                     store.time === 10000 ? 'bg-cyan-300 translate-y-1 shadow-none' : 'bg-white']"
          >
            <input type="radio" name="time" :value="10000" v-model="store.time" class="hidden">
            10s
          </label>
          <label 
            :class="['comic-btn py-2 text-center text-sm font-bold cursor-pointer transition-transform active:translate-y-1 active:shadow-none', 
                     store.time === 30000 ? 'bg-cyan-300 translate-y-1 shadow-none' : 'bg-white']"
          >
            <input type="radio" name="time" :value="30000" v-model="store.time" class="hidden">
            30s
          </label>
          <label 
            :class="['comic-btn py-2 text-center text-sm font-bold cursor-pointer transition-transform active:translate-y-1 active:shadow-none', 
                     store.time === 60000 ? 'bg-cyan-300 translate-y-1 shadow-none' : 'bg-white']"
          >
            <input type="radio" name="time" :value="60000" v-model="store.time" class="hidden">
            60s
          </label>
        </div>
      </div>

      <!-- Start Button -->
      <NuxtLink to="/game" class="block w-full">
        <button class="w-full py-4 bg-green-500 hover:bg-green-400 border-4 border-black rounded-2xl text-2xl font-black uppercase text-white shadow-[6px_6px_0px_#000] active:translate-y-2 active:shadow-none transition-all">
          PLAY {{ store.mode }}!
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '~/stores/shop';
const store = useShopStore();

const changeDifficulty = (diff) => {
    store.mode = diff;
    if(diff === 'easy'){
        store.difficulty.MIN_RANDOM_TIME = 1000;
        store.difficulty.MAX_RANDOM_TIME = 3000;
    } else if(diff === 'medium'){
        store.difficulty.MIN_RANDOM_TIME = 500;
        store.difficulty.MAX_RANDOM_TIME = 1500;
    } else if(diff === 'hard'){
        store.difficulty.MIN_RANDOM_TIME = 200;
        store.difficulty.MAX_RANDOM_TIME = 1000;
    }
}
</script>

<style>
/* Comic Dots Pattern */
.comic-bg {
  background-image: radial-gradient(black 15%, transparent 16%), radial-gradient(black 15%, transparent 16%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

/* Custom Text Stroke using text-shadow for comic effect */
.stroke-text {
  -webkit-text-stroke: 2px black;
  color: inherit;
}

/* Thick button styles */
.comic-btn {
  border: 4px solid black;
  border-radius: 12px;
  box-shadow: 4px 4px 0px black;
  color: black;
}

.text-magenta-500 {
  color: #ff00ff;
}
</style>
