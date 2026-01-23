<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-gray-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-6xl">
            Gérez votre collection de <span class="text-indigo-600">jeux de société</span>
          </h1>
          <p class="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Importez vos jeux depuis BGG, organisez vos parties et partagez votre passion.
          </p>

          <div class="mt-10 flex justify-center gap-4">
            <router-link
                to="/login"
                class="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition shadow-lg"
            >
              Se connecter
            </router-link>

            <router-link
                to="/register"
                class="px-8 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition"
            >
              Créer un compte
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <section class="max-w-7xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Jeux à la une</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GameCard v-for="game in featuredGames" :key="game.id" :game="game" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import GameCard from '../components/GameCard.vue';

const featuredGames = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/boardgames');
    featuredGames.value = response.data.slice(0, 4);
  } catch (error) {
    console.error("Erreur chargement jeux :", error);
  }
});
</script>