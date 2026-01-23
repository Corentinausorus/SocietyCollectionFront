<script setup>
defineProps(['game']); // On définit que ce composant reçoit un objet "game"
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
    <img :src="game.image" class="h-48 w-full object-cover" />
    <div class="p-4">
      <h3 class="font-bold text-gray-800">{{ game.name }}</h3>
      <p class="text-sm text-gray-500 line-clamp-2">{{ game.description }}</p>
    </div>
  </div>
</template>