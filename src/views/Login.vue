<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" sm="8" md="4">
        <v-card elevation="8" class="rounded-xl overflow-hidden">
          <v-toolbar color="primary" flat>
            <v-toolbar-title class="text-center w-100 font-weight-bold">Connexion</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-8">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                  v-model="user.username"
                  label="Utilisateur"
                  variant="underlined"
                  color="primary"
                  prepend-inner-icon="mdi-account"
                  class="mb-4"
              ></v-text-field>

              <v-text-field
                  v-model="user.password"
                  label="Mot de passe"
                  type="password"
                  variant="underlined"
                  color="primary"
                  prepend-inner-icon="mdi-lock"
              ></v-text-field>

              <v-btn type="submit" color="secondary" block size="x-large" class="mt-8 rounded-pill font-weight-bold">
                Entrer dans la salle de jeu
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const user = ref({ username: '', password: '' });
const message = ref('');

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      username: user.value.username,
      password: user.value.password
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      router.push('/dashboard');
    }
  } catch (error) {
    message.value = "Erreur : Identifiants incorrects";
    console.error(error);
  }
};
</script>

<style scoped>
.error { color: red; }
</style>