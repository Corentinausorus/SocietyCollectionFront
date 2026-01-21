<template>
  <div class="login-container">
    <h2>Connexion à Society Collection</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Nom d'utilisateur :</label>
        <input v-model="user.username" type="text" required />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input v-model="user.password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="message" class="error">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ username: '', password: '' });
const message = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: user.value.username,
      password: user.value.password
    });

    if (response.data.token) {
      // On stocke le JSON (token + username) dans le navigateur
      localStorage.setItem('user', JSON.stringify(response.data));
      // On redirige vers le dashboard
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
.login-container { max-width: 300px; margin: auto; padding: 20px; }
</style>