<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <span class="text-2xl font-bold text-indigo-600">Society Collection</span>
        <button @click="handleLogout" class="text-sm font-medium text-red-600 hover:text-red-500">Déconnexion</button>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-10 px-4">
      <div v-if="games.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="game in games" :key="game.id" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900">{{ game.name }}</h3>
            <p class="text-gray-600 mt-2 text-sm">{{ game.description || 'Pas de description' }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ game.category }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {{ game.minPlayers }}-{{ game.maxPlayers }} joueurs
              </span>
              <button class="text-indigo-600 hover:underline text-sm font-medium">Détails</button>
            </div>
          </div>
          <div class="h-48 w-full bg-gray-200">
            <img
                v-if="game.thumbnail"
                :src="game.thumbnail"
                class="w-full h-full object-cover"
                alt="Image du jeu"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <span>Pas d'image</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
        <p class="text-gray-500">Aucun jeu dans votre collection pour le moment.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const games = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/boardgames');
    console.log("Mes jeux reçus :", response.data); // <--- AJOUTE CECI
    games.value = response.data;
  } catch (error) {
    console.error("Détails de l'erreur :", error.response); // <--- ET CECI
  }
});

const handleLogout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};
</script>