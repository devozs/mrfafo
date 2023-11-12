

<template>
  <div class=" bg-slate-500 min-h-screen text-white">
    <div>
      <div class=" w-full h-16 shadow-md flex justify-evenly items-center">
        <button class=" shadow-md text-slate-100  px-2 py-1 mx-1 my-2 hover:bg-slate-700">
          <NuxtLink to="/">Home</NuxtLink>
        </button>

        <div class="score flex items-center justify-evenly flex-1">
          <span>
            <button @click="restartGame"
              class=" shadow-md text-slate-100  px-2 py-1 mx-1 my-2 hover:bg-slate-700">Retry</button>

          </span>
          <span class="">Score: {{ score }}</span>
          <span>
            <StopWatch :time="store.time" :resetTime="start" />
          </span>
          <span>{{ store.mode.toUpperCase() }}</span>
        </div>

      </div>
    </div>
    <div class="w-full flex justify-center mt-5 flex-row items-center">
      <h1 class="font-bold text-xl">#MrFAFO</h1>
      <img :src="'mole-hammer.png'" class="w-20" alt="">
    </div>
    <div class="game">
      <div class="hole" v-for="bushes, index in 6" :class="index + 1 === hole ? 'up' : ''" :key="index">
        <img v-show="start && !moleBonked" :src="randomFafo()" class="rounded-t-full mole" alt="" @click="bonk">
      </div>
    </div>
    <div v-if="gameEndDialog" class="w-full flex justify-center mt-5 flex-row items-center">
      <div class="flex w-full m-auto justify-center bg-slate-500 items-center ">
        <div class=" w-66 bg-slate-600 rounded-md px-6 py-8 shadow-lg  text-slate-50 text-center">
          <h1 class=" text-2xl text-white font-bold">Game Over!</h1>
          <h1 class=" text-2xl text-white font-bold">{{ `Your score is ${score}` }}</h1>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useShopStore } from '~/stores/shop.js'
const store = useShopStore()

const start = ref(false);
const hole = ref(0);
const lastHole = ref(0);
const peepTimeout = ref(null);
const startTimeout = ref(null);
const moleBonked = ref(false);
const score = ref(0);

const gameEndDialog = ref(false)

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHole = (holes) => {
  let id = Math.floor(Math.random() * holes + 1);
  while (id === lastHole.value) {
    id = Math.floor(Math.random() * holes + 1);
  }
  lastHole.value = id;
  return id;
};
const randomFafo = () => {
  const total = 9
  let id = Math.floor(Math.random() * total + 1);
  return "fafo-" + id + ".jpeg";
};

const peep = () => {
  clearTimeout(peepTimeout); // Clear any existing peep timeouts

  let changeTime = randomTime(store.difficulty.MIN_RANDOM_TIME, store.difficulty.MAX_RANDOM_TIME);
  hole.value = randomHole(6);

  peepTimeout.value = setTimeout(() => {
    if (start.value) peep();

  }, changeTime);
};


const startGame = () => {
  gameEndDialog.value = false
  start.value = true;
  let gameTime = store.time;
  score.value = 0;
  peep()
  startTimeout.value = setTimeout(() => {
    start.value = false;
    hole.value = 0;
    // alert(`Game Over! Your score is ${score.value}`);
    gameEndDialog.value = true
  }, gameTime)
}

const restartGame = () => {
  gameEndDialog.value = false
  clearTimeout(peepTimeout.value);
  clearTimeout(startTimeout.value);
  start.value = false;
  hole.value = 0;
  moleBonked.value = false;

  // Start the game again
  setTimeout(() => {
    startGame();
  }, 100);
};

const bonk = (event) => {
  if (!event.isTrusted) return;
  score.value++;
  moleBonked.value = true;
  clearTimeout(peepTimeout.value); // Stop the current peep
  setTimeout(() => {
    moleBonked.value = false;
    peep(); // Start a new peep
  }, 200);
};


onMounted(() => {
  startGame()
})
</script>

<style  scoped>
.game {
  width: 600px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.hole {
  flex: 1 0 33.33%;
  overflow: hidden;
  position: relative;
}

.hole:after {
  /* display: block; */
  display: inline-block;
  background: url('/bush.svg') bottom center no-repeat;
  background-size: cover;
  content: '';
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 2;
  bottom: -30px;
}

.mole {
  background: bottom center no-repeat;

  background-size: 100%;
  position: absolute;
  top: 100%;

  height: 150px;
  left: 5%;
  transition: all 0.4s;
}

.hole.up .mole {
  top: 40px;
}

@media (max-width: 600px) {
  .game {
    width: 100%;
    padding: 0 10px; /* Add padding to prevent elements from touching the screen edges */
  }

  .hole {    
    flex: 1 0 40%;
    margin: 5px;
    position: relative;

    
  }

  .hole:after {
    width: 100%; 
    height: 100px; 
    bottom: -50px; 
  }

  .mole {
    height: 100px; /* Adjust mole size to fit the smaller hole */
    top: 100%;
    left: 42%;
    transform: translateX(-50%); /* Center the mole horizontally within the hole */
  }

  .hole.up .mole {
    top: 10px; /* Adjust the popped-up position of the mole */
  }

}

</style>