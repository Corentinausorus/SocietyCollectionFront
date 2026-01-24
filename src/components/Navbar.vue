<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-app-bar-title class="font-weight-bold cursor-pointer" @click="router.push('/')">
      Society Collection
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <div class="hidden-sm-and-down">
      <v-btn variant="text" to="/">Accueil</v-btn>

      <template v-if="!isConnected">
        <v-btn variant="text" to="/login">Connexion</v-btn>
        <v-btn variant="elevated" color="white" class="text-primary ml-2" to="/register">
          S'inscrire
        </v-btn>
      </template>

      <template v-else>
        <v-btn variant="text" to="/dashboard">Mon Dashboard</v-btn>
        <v-btn icon @click="handleLogout" color="red-lighten-1">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="Accueil" to="/"></v-list-item>

      <v-divider class="my-2"></v-divider>

      <template v-if="!isConnected">
        <v-list-item prepend-icon="mdi-login" title="Connexion" to="/login"></v-list-item>
        <v-list-item prepend-icon="mdi-account-plus" title="S'inscrire" to="/register"></v-list-item>
      </template>

      <template v-else>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Déconnexion" @click="handleLogout" color="red"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isConnected = ref(false);
const drawer = ref(false);

const checkAuth = () => {
  isConnected.value = !!localStorage.getItem('user');
};

// Vérifier au montage et à chaque changement de page
onMounted(checkAuth);
watch(() => route.path, checkAuth);

const handleLogout = () => {
  localStorage.removeItem('user');
  isConnected.value = false;
  router.push('/login');
};
</script>