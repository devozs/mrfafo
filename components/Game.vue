<template>
  <div class="background-image min-h-screen font-sans flex flex-col relative overflow-hidden">
    <!-- Scoreboard / Top Bar -->
    <div class="w-full flex justify-center p-2 sm:p-4 relative z-10">
      <div class="scoreboard-container w-full max-w-4xl bg-white border-4 border-black rounded-full shadow-[8px_8px_0px_#000] flex flex-wrap items-center justify-between px-4 sm:px-6 py-2 sm:py-3 font-black uppercase">
        <div class="scoreboard-actions flex items-center space-x-2 sm:space-x-4">
          <NuxtLink to="/">
            <button class="comic-btn bg-yellow-400 hover:bg-yellow-300 active:translate-y-1 active:shadow-none transition-all">
              Home
            </button>
          </NuxtLink>

          <button @click="restartGame" class="comic-btn bg-cyan-400 hover:bg-cyan-300 active:translate-y-1 active:shadow-none transition-all">
            Retry
          </button>
        </div>

        <div class="scoreboard-stats flex items-center space-x-2 sm:space-x-6 mt-2 sm:mt-0">
          <div class="text-sm sm:text-lg tracking-tight text-magenta-500 stroke-text">
            Score: <span class="text-xl sm:text-3xl">{{ score }}</span>
          </div>

          <div class="text-sm sm:text-lg flex items-center bg-gray-100 px-2 sm:px-4 py-1 border-2 sm:border-4 border-black rounded-xl">
            ⏱ <StopWatch class="ml-1 sm:ml-2" :time="store.time" :resetTime="start" />
          </div>

          <div class="text-xs sm:text-lg text-green-500 stroke-text">
            {{ store.mode }}
          </div>
        </div>
      </div>
    </div>

    <!-- Title area -->
    <div class="w-full flex justify-center mt-2 mb-8 relative z-10">
      <h1 class="font-black text-5xl sm:text-6xl text-[#fde047] stroke-text transform -rotate-3 shadow-title uppercase tracking-tighter" style="color: #fde047 !important;">
        #MrFAFO
      </h1>
      <img :src="'mole-hammer.png'" class="w-20 sm:w-24 ml-4 transform rotate-12 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:scale-110 transition-transform" alt="">
    </div>

    <!-- Game Board -->
    <div class="game-container flex-1 w-full max-w-4xl mx-auto relative z-10">
      <div class="relative w-full h-full min-h-[50vh] sm:min-h-[600px] px-4">
        <div class="hole absolute" v-for="(pos, index) in holePositions" :key="index" :style="{ left: pos.x + '%', top: pos.y + '%', transform: 'translate(-50%, -50%)' }">
          <div class="mole-mask">
            <img v-show="start && !moleBonked && index + 1 === hole" :src="randomFafo()" class="mole-img border-4 border-black" alt="" @click="bonk" :id="`mole-${index}`">
          </div>
          
          <!-- Dynamic Scale 2D Bush (replaces static SVG) -->
          <div class="comic-bush">
            <div class="bump b1"></div>
            <div class="bump b2"></div>
            <div class="bump b3"></div>
            <div class="base"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Over Splash -->
    <div v-if="gameEndDialog" class="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div class="comic-splash relative bg-yellow-300 border-[6px] border-black rounded-[3rem] p-8 max-w-lg w-full text-center shadow-[16px_16px_0px_#000] transform rotate-2 animate-popIn">
        
        <div class="absolute -top-10 -left-10 text-6xl transform -rotate-12">💥</div>
        <div class="absolute -bottom-10 -right-8 text-6xl transform rotate-12">🗯️</div>

        <h1 class="text-6xl font-black text-white stroke-text uppercase tracking-tighter shadow-title mb-4 transform -rotate-2">
          Time's Up!
        </h1>

        <div class="bg-white border-4 border-black rounded-2xl p-6 my-6 transform rotate-1">
          <p class="text-2xl font-bold uppercase mb-2">Total Score</p>
          <p class="text-7xl font-black text-magenta-500 stroke-text shadow-title">{{ score }}</p>
          <p class="text-xl font-bold uppercase mt-4 text-gray-400">
            Rank: <span class="text-black">{{ rankTitle }}</span>
          </p>
        </div>

        <div class="flex space-x-4 mt-8">
          <NuxtLink to="/" class="flex-1">
            <button class="w-full comic-btn bg-cyan-400 hover:bg-cyan-300 py-4 text-xl font-black uppercase active:translate-y-2 active:shadow-none transition-all">
              Menu
            </button>
          </NuxtLink>
          <button @click="restartGame" class="flex-[2] comic-btn bg-green-500 hover:bg-green-400 py-4 text-xl font-black uppercase text-white active:translate-y-2 active:shadow-none transition-all">
            Play Again!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShopStore } from '~/stores/shop.js'
import { computed, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const store = useShopStore()

const start = ref(false);
const hole = ref(0);
const lastHole = ref(0);
const peepTimeout = ref(null);
const startTimeout = ref(null);
const moleBonked = ref(false);
const score = ref(0);
const holePositions = ref([]);

const gameEndDialog = ref(false)

const rankTitle = computed(() => {
  if (score.value === 0) return "Did You Even Try?"
  if (score.value < 10) return "Rookie Whacker"
  if (score.value < 20) return "Solid Bonker"
  if (score.value < 30) return "Pro Whack-A-Mole"
  return "GOD TIER 👑"
})

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHole = () => {
  const holes = store.holesCount;
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
  return "/fafo-" + id + ".jpeg";
};

const peep = () => {
  clearTimeout(peepTimeout.value); // Clear any existing peep timeouts

  let changeTime = randomTime(store.difficulty.MIN_RANDOM_TIME, store.difficulty.MAX_RANDOM_TIME);
  
  // Hide previous mole if any
  if (hole.value > 0) {
    gsap.to(`#mole-${hole.value - 1}`, {
      y: 140,
      scale: 0.5,
      duration: 0.2,
      ease: "power2.in"
    });
  }

  hole.value = randomHole();

  // Animate new mole popping up like 2D bouncy object
  if (start.value && !moleBonked.value) {
    gsap.fromTo(`#mole-${hole.value - 1}`, 
      { y: 140, scale: 0.5, rotation: (Math.random() - 0.5) * 30 }, 
      { y: 0, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );
  }

  peepTimeout.value = setTimeout(() => {
    if (start.value) peep();
  }, changeTime);
};

const generateHolePositions = () => {
  holePositions.value = []
  const numHoles = store.holesCount
  for (let i = 0; i < numHoles; i++) {
    let x, y, overlap;
    let attempts = 0;
    do {
      overlap = false;
      x = 5 + Math.random() * 90; // 5% to 95%
      y = 10 + Math.random() * 80; // 10% to 90%
      for (const pos of holePositions.value) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        if (Math.sqrt(dx*dx + dy*dy) < 22) { // Ensure at least 22% distance between holes
          overlap = true;
          break;
        }
      }
      attempts++;
    } while (overlap && attempts < 100);
    holePositions.value.push({ x, y });
  }
}

const startGame = () => {
  gameEndDialog.value = false
  start.value = true;
  generateHolePositions()
  let gameTime = store.time;
  score.value = 0;
  peep()
  startTimeout.value = setTimeout(() => {
    start.value = false;
    // Hide last mole
    if (hole.value > 0) {
      gsap.to(`#mole-${hole.value - 1}`, { y: 140, scale: 0.5, duration: 0.2 });
    }
    hole.value = 0;
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

  setTimeout(() => {
    startGame();
  }, 100);
};

const bonk = (event) => {
  if (!event.isTrusted) return;
  score.value++;
  moleBonked.value = true;
  clearTimeout(peepTimeout.value);
  
  // Animate bonk hit
  gsap.to(`#mole-${hole.value - 1}`, {
    y: 140,
    scale: 0.8,
    rotation: (Math.random() > 0.5 ? 1 : -1) * 45,
    duration: 0.2,
    ease: "power3.in"
  });

  setTimeout(() => {
    moleBonked.value = false;
    peep();
  }, 200);
};

onMounted(() => {
  startGame()
})
</script>

<style>
/* Comic General Styles */
.stroke-text {
  -webkit-text-stroke: 1px black;
}
@media (min-width: 600px) {
  .stroke-text {
    -webkit-text-stroke: 2px black;
  }
}
.shadow-title {
  text-shadow: 4px 4px 0px rgba(0,0,0,1);
}
.comic-btn {
  border: 4px solid black;
  border-radius: 12px;
  box-shadow: 4px 4px 0px black;
  color: black;
}

/* Base App Background */
.background-image {
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/images/cover.png');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Game Grid & Holes */
.game-container {
  display: flex;
  align-items: center;
}

.hole {
  position: absolute;
  overflow: visible; /* We use .mole-mask to hide the picture */
  width: 140px;
  height: 140px; 
  pointer-events: none; /* Let clicks pass to the mole */
}

/* Dynamically sizing DOM Bush */
.comic-bush {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 45px;
  z-index: 20;
  pointer-events: none;
  filter: drop-shadow(0px 8px 0px rgba(0,0,0,1));
}
.comic-bush .base {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 20px;
  background: black;
  border-radius: 20px 20px 10px 10px;
}
.comic-bush .bump {
  position: absolute;
  background: black;
  border-radius: 50%;
}
.comic-bush .b1 {
  width: 55%;
  height: 40px;
  left: -5%;
  bottom: 5px;
}
.comic-bush .b2 {
  width: 70%;
  height: 55px;
  left: 15%;
  bottom: 0px;
}
.comic-bush .b3 {
  width: 50%;
  height: 38px;
  right: -5%;
  bottom: 5px;
}

.mole-mask {
  position: absolute;
  bottom: 10px; 
  left: 0;
  width: 100%;
  height: 140px;
  overflow: hidden;
  z-index: 10;
  pointer-events: none;
  border-radius: 1.5rem 1.5rem 0 0;
}

.mole-img {
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;
  transform: translateY(140px); /* Initial hidden state */
  object-fit: cover;
  cursor: crosshair;
  pointer-events: auto; /* Catch the clicks! */
  border-radius: 1.5rem 1.5rem 0 0;
}

/* Animations */
@keyframes popIn {
  0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(2deg); opacity: 1; }
}
.animate-popIn {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .hole {
    width: 100px;
    height: 100px;
  }
  .comic-bush {
    height: 35px;
    bottom: -3px;
  }
  .mole-mask {
    height: 100px;
    bottom: 8px;
  }
  .scoreboard-container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
  }
  .scoreboard-actions {
    width: 100%;
    justify-content: center;
    margin-top: 0.25rem;
  }
  .scoreboard-stats {
    width: 100%;
    justify-content: space-around;
  }
  .comic-btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>