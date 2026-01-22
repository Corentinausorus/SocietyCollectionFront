<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Créer un compte</h2>
        <p class="text-gray-500 mt-2">Rejoignez Society Collection dès aujourd'hui</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">

        <div>
          <label class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
          <input
              v-model="user.username"
              type="text"
              required
              class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Ex: Corentin59"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Adresse Email</label>
          <input
              v-model="user.email"
              type="email"
              required
              class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="nom@exemple.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
              v-model="user.password"
              type="password"
              required
              class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
          />
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Traitement...
          </span>
          <span v-else>S'inscrire</span>
        </button>
      </form>

      <div v-if="message" :class="`mt-4 p-3 rounded-lg text-sm text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`">
        {{ message }}
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Déjà inscrit ?
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Connectez-vous ici
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
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
    const response = await axios.post('http://localhost:8080/api/auth/register', user.value);
    isError.value = false;
    message.value = "Compte créé ! Redirection vers la page de connexion...";

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.message || "Une erreur est survenue lors de l'inscription";
  } finally {
    loading.value = false;
  }
};
</script>