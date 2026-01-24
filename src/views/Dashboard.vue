<template>
  <v-container class="py-10">
    <v-row align="center" class="mb-8">
      <v-col>
        <h1 class="text-h4 font-weight-bold text-primary">Ma Collection</h1>
        <p class="text-subtitle-1 text-grey">Gérez vos jeux favoris</p>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" prepend-icon="mdi-plus" size="large" elevation="2">
          Ajouter un jeu
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="games.length > 0">
      <v-col
          v-for="game in games"
          :key="game.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <GameCard :game="game" />
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="12" md="6" class="text-center py-16">
        <v-icon size="80" color="grey-lighten-1">mdi-dice-multiple</v-icon>
        <h3 class="text-h5 text-grey-darken-1 mt-4">Votre collection est vide</h3>
        <p class="text-grey mb-6">Commencez par importer des jeux depuis BoardGameGeek !</p>
        <v-btn color="primary" variant="outlined">Parcourir les jeux</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import GameCard from '../components/GameCard.vue'; // On importe ton nouveau composant

const games = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/boardgames');
    games.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux :", error);
  }
});
</script>