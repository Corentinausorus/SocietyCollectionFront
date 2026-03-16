<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import favoriteService from '../services/favorite.service.js';

const router = useRouter();

const props = defineProps(['game']);

const isLoggedIn = !!localStorage.getItem('user');
const isFavorite = ref(false);
const loadingFavorite = ref(false);

onMounted(async () => {
  if (!isLoggedIn) return;
  try {
    isFavorite.value = await favoriteService.isFavorite(props.game.id);
  } catch {
    // non connecté ou erreur silencieuse
  }
});

async function toggleFavorite() {
  if (!isLoggedIn || loadingFavorite.value) return;
  loadingFavorite.value = true;
  try {
    if (isFavorite.value) {
      await favoriteService.removeFavorite(props.game.id);
      isFavorite.value = false;
    } else {
      await favoriteService.addFavorite(props.game.id);
      isFavorite.value = true;
    }
  } catch (error) {
    console.error('Erreur favori :', error);
  } finally {
    loadingFavorite.value = false;
  }
}
</script>

<template>
  <v-card
      class="mx-auto h-100 d-flex flex-column rounded-xl"
      elevation="3"
      hover
      style="cursor: pointer"
      @click="router.push(`/boardgames/${game.id}`)"
  >
    <v-img
        :src="game.image || game.thumbnail"
        height="200"
        cover
        class="bg-grey-lighten-2"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-item>
      <v-card-title class="text-primary font-weight-bold">
        {{ game.name }}
      </v-card-title>
      <v-card-subtitle>
        Publié en {{ game.yearPublished || 'N/C' }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1">
      <p class="text-body-2 text-grey-darken-1 line-clamp-2">
        {{ game.description || 'Aucune description disponible pour ce jeu.' }}
      </p>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-4 bg-grey-lighten-5">
      <v-chip size="small" color="secondary" variant="flat" prepend-icon="mdi-account-group">
        {{ game.minPlayers }}-{{ game.maxPlayers }} joueurs
      </v-chip>

      <v-spacer></v-spacer>

      <v-btn
          v-if="isLoggedIn"
          variant="text"
          :color="isFavorite ? 'red' : 'grey'"
          :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
          size="large"
          :loading="loadingFavorite"
          @click.stop="toggleFavorite"
      ></v-btn>

      <v-btn
          variant="text"
          color="accent"
          icon="mdi-arrow-right-bold-circle"
          size="large"
          @click.stop="router.push(`/boardgames/${game.id}`)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
/* Pour couper la description si elle est trop longue */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>