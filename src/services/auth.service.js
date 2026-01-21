import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    async login(user) {
        const response = await axios.post(API_URL + 'login', {
            username: user.username,
            password: user.password
        });
        if (response.data.token) {
            // On stocke le token et les infos dans le navigateur
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();