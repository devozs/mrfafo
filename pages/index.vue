<template>
    <div>
        <div class="background-image flex w-full m-auto justify-center bg-white  items-center min-h-screen">

            <div class=" w-66 bg-black bg-opacity-90 rounded-t-3xl rounded-md px-6 py-8 shadow-lg  text-slate-50 text-center">
                <h1 class=" text-2xl text-white font-bold">Whack #MrFAFO</h1>

                <div class="difficulty mt-2">
                    <b>Pollywood Level:</b>
                    <div>
                        <button class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700 uppercase"
                            @click="changeDifficulty('easy')">Easy</button>
                        <button @click="changeDifficulty('medium')"
                            class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700 uppercase">Medium</button>
                        <button @click="changeDifficulty('hard')"
                            class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700 uppercase">Hard</button>
                    </div>
                </div>
                <div class="time mt-2">
                    <b>Time:</b>
                    <div>
                        <span class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700">
                            <input type="radio" name="time" id="10s" :value="10000" checked v-model="store.time"><label
                                for="10s">10s</label>
                        </span>
                        <span class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700">
                            <input type="radio" name="time" id="30s" :value="30000" v-model="store.time"><label
                                for="30s">30s</label>
                        </span>
                        <span class=" shadow-md text-slate-300 px-3 py-1 mx-1 my-2 hover:bg-slate-700">
                            <input type="radio" name="time" id="60s" :value="60000" v-model="store.time"><label
                                for="60s">60s</label>
                        </span>
                    </div>
                </div>
                <button class=" bg-green-600 w-full py-2 mt-4 rounded-md" ><NuxtLink to="/game">Start {{ store.mode.toUpperCase() }}</NuxtLink> </button>
            </div>
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

<style scoped>
.background-image {
  background-image: url('/images/cover.png'); /* Replace with your image path */
  background-position: center;
  background-repeat: no-repeat;
}

</style>




