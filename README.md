# Society Collection — Frontend (Vue 3 + Vite)

Projet front en Vue 3 + Vite pour gérer une collection de jeux de société. Ce README couvre l'installation, le lancement, la configuration et les points de débogage courants.

## Prérequis
- Node.js >= 16 et npm
- Backend disponible et démarré (par défaut attendu sur `http://localhost:8080`)
- (Optionnel) Tailwind CSS si vous voulez utiliser les classes présentes

## Installation
1. Cloner le dépôt et se placer dans le dossier du projet.
2. Installer les dépendances :
   - `npm install`

## Lancer en développement
- `npm run dev`  
  Vite démarre par défaut sur le port `5173`. Accéder à l'interface via `http://localhost:5173`.

## Construire pour la production
- `npm run build`
- Prévisualiser le build : `npm run preview`

## Configuration
- Le code actuel utilise `http://localhost:8080` en dur pour l'API (voir `src/services/api.js`). Pour rendre cela configurable, ajouter un fichier `.env` à la racine :
  - Exemple : `VITE_API_URL=http://localhost:8080`
- Remplacer l'URL dans `src/services/api.js` par `import.meta.env.VITE_API_URL` si nécessaire.

## Routes principales
- `/Home` : page d'accueil
- `/login` : connexion (stocke `user` dans `localStorage`)
- `/register` : création de compte
- `/dashboard` : tableau de bord protégé (`meta.requiresAuth`)

## Authentification
- Après connexion, l'objet renvoyé (contenant `token`) est stocké via `localStorage.setItem('user', JSON.stringify(...))`.
- Le router utilise un guard (`src/router/index.js`) qui redirige vers `/login` si `localStorage.getItem('user')` est `null`.
- Les requêtes API utilisent `src/services/api.js` pour ajouter l'entête `Authorization` à partir de `localStorage`.

## Dépannage rapide
- Aucune requête dans l'onglet Network :
  - Vérifier que le backend est démarré et accessible (`http://localhost:8080/api/...`).
  - Vérifier la baseURL dans `src/services/api.js`.
  - Vérifier les erreurs CORS côté backend.
- Page blanche ou redirection vers `/` :
  - S'assurer que `index.html` existe (contient `<div id="app"></div>`).
  - Relancer Vite : `npm run dev` et ouvrir `http://localhost:5173/login`.
  - Ouvrir la console (`F12`) et lire les erreurs JavaScript.
- Problèmes d'auth 401 silencieux :
  - Ajouter un intercepteur de réponse dans `src/services/api.js` pour supprimer `user` et rediriger vers `/login` (ou utiliser `window.location.href` si import circulaire).
- Styles qui cachent le contenu :
  - Vérifier `src/style.css` (éviter `display: flex` sur `body` ou `place-items: center` si cela casse la mise en page).

## Commandes utiles
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm list tailwindcss` (vérifier installation Tailwind)

## Structure rapide
- `src/main.js` — point d'entrée
- `src/router/index.js` — routes et guards
- `src/services/api.js` — instance axios partagée
- `src/services/auth.service.js` — gestion basique login/logout
- `src/views/*` — pages (`Home`, `Login`, `Register`, `Dashboard`)
- `src/components/*` — composants réutilisables

## Erreurs fréquentes & corrections rapides
- Pas de requêtes : baseURL incorrecte ou backend arrêté.
- Redirection non attendue : guard du router se base sur `localStorage`.
- Login sans stockage du token : vérifier `response.data.token` dans le code de connexion (`src/views/Login.vue` ou `src/services/auth.service.js`).
- Import circulaire entre `api` et `router` : utiliser `window.location.href = '/login'` dans l'intercepteur si nécessaire.

## Licence
- À ajouter selon politique du projet.