<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12" class="rounded-xl">
          <v-card-item class="bg-primary text-white text-center py-6">
            <v-card-title class="text-h4 font-weight-bold">Rejoignez-nous</v-card-title>
          </v-card-item>

          <v-card-text class="pa-8">
            <v-form @submit.prevent="handleRegister">
              <v-text-field v-model="user.username" label="Pseudo" variant="outlined" color="primary" prepend-inner-icon="mdi-account-circle" class="mb-2"></v-text-field>
              <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" color="primary" prepend-inner-icon="mdi-email" class="mb-2"></v-text-field>
              <v-text-field v-model="user.password" label="Mot de passe" type="password" variant="outlined" color="primary" prepend-inner-icon="mdi-lock" class="mb-4"></v-text-field>

              <v-btn type="submit" color="accent" block size="x-large" class="font-weight-bold text-black" :loading="loading">
                Créer mon compte
              </v-btn>
            </v-form>

            <v-alert v-if="message" :type="isError ? 'error' : 'success'" variant="tonal" class="mt-6">
              {{ message }}
            </v-alert>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-center py-4">
            <v-btn variant="text" to="/login" color="primary" class="text-none">
              J'ai déjà une boîte de jeu (Connexion)
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api'; // Utilise ton instance API
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ username: '', email: '', password: '' });
const message = ref('');
const isError = ref(false);
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  message.value = '';
  try {
    await api.post('/auth/register', user.value);
    isError.value = false;
    message.value = "Compte créé ! Redirection...";
    setTimeout(() => router.push('/login'), 2000);
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.message || "Erreur lors de l'inscription";
  } finally {
    loading.value = false;
  }
};
</script>