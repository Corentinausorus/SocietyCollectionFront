<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api.js';

const route = useRoute();
const router = useRouter();
const game = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await api.get(`/boardgames/${route.params.id}`);
    game.value = response.data;
  } catch (e) {
    console.error('Erreur GameDetail :', e);
    error.value = `Erreur : ${e.response?.status} - ${e.response?.data?.message || e.message}`;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container class="py-8" max-width="800">

    <v-btn
        variant="text"
        color="primary"
        prepend-icon="mdi-arrow-left"
        class="mb-4"
        @click="router.back()"
    >
      Retour
    </v-btn>

    <v-progress-circular v-if="loading" indeterminate color="primary" class="d-block mx-auto mt-8" size="64" />

    <v-alert v-else-if="error" type="error" class="mt-4">{{ error }}</v-alert>

    <v-card v-else class="rounded-xl" elevation="3">
      <v-img
          :src="game.image || game.thumbnail"
          height="350"
          cover
          class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey-lighten-5" />
          </v-row>
        </template>
      </v-img>

      <v-card-item class="pa-6">
        <v-card-title class="text-h5 text-primary font-weight-bold">
          {{ game.name }}
        </v-card-title>
        <v-card-subtitle class="mt-1">
          Publié en {{ game.yearPublished || 'N/C' }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="pa-6 pt-0">
        <p class="text-body-1 text-grey-darken-2 mb-6">
          {{ game.description || 'Aucune description disponible pour ce jeu.' }}
        </p>

        <v-divider class="mb-4" />

        <v-row>
          <v-col cols="6" sm="3">
            <div class="text-caption text-grey">Joueurs</div>
            <div class="text-body-1 font-weight-medium">{{ game.minPlayers }}–{{ game.maxPlayers }}</div>
          </v-col>
          <v-col cols="6" sm="3" v-if="game.minPlaytime || game.maxPlaytime">
            <div class="text-caption text-grey">Durée</div>
            <div class="text-body-1 font-weight-medium">{{ game.minPlaytime }}–{{ game.maxPlaytime }} min</div>
          </v-col>
          <v-col cols="6" sm="3" v-if="game.minAge">
            <div class="text-caption text-grey">Âge minimum</div>
            <div class="text-body-1 font-weight-medium">{{ game.minAge }}+</div>
          </v-col>
          <v-col cols="6" sm="3" v-if="game.bggRating">
            <div class="text-caption text-grey">Note BGG</div>
            <div class="text-body-1 font-weight-medium">{{ game.bggRating }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

  </v-container>
</template>
