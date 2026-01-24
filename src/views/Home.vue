<template>
  <v-container fluid class="pa-0">
    <v-sheet color="background" class="py-16 px-4 text-center">
      <v-responsive max-width="800" class="mx-auto">
        <h1 class="text-h2 font-weight-black text-primary mb-6">
          Society <span class="text-secondary">Collection</span>
        </h1>
        <p class="text-h6 text-grey-darken-2 mb-10">
          L'espace privilégié des passionnés pour gérer leur ludothèque.
        </p>

        <div v-if="!isConnected" class="d-flex justify-center gap-4">
          <v-btn to="/login" color="primary" size="x-large">Se connecter</v-btn>
          <v-btn to="/register" variant="outlined" color="primary" size="x-large">Créer un compte</v-btn>
        </div>
        <v-btn v-else to="/dashboard" color="secondary" size="x-large" prepend-icon="mdi-view-dashboard">
          Mon Dashboard
        </v-btn>
      </v-responsive>
    </v-sheet>

    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold mb-8 text-primary">Jeux à la une</h2>
      <v-row v-if="featuredGames.length > 0">
        <v-col v-for="game in featuredGames" :key="game.id" cols="12" sm="6" md="3">
          <GameCard :game="game" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import GameCard from '../components/GameCard.vue';

const featuredGames = ref([]);
const isConnected = ref(false);

onMounted(async () => {
  try {
    const user = localStorage.getItem('user');
    isConnected.value = !!user;

    const response = await api.get('/boardgames');
    featuredGames.value = response.data.slice(0, 4);
  } catch (error) {
    console.error("Erreur chargement jeux :", error);
  }
});
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
</style>