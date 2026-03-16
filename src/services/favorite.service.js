import api from './api';

const FAVORITES_URL = '/favorites';

export default {
    async isFavorite(boardGameId) {
        const response = await api.get(`${FAVORITES_URL}/isFavorite/${boardGameId}`);
        return response.data;
    },

    async addFavorite(boardGameId) {
        const response = await api.post(`${FAVORITES_URL}/${boardGameId}`);
        return response.data;
    },

    async removeFavorite(boardGameId) {
        await api.delete(`${FAVORITES_URL}/remove/${boardGameId}`);
    }
};
