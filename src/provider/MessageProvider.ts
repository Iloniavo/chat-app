import { globalAxios as axios } from "../config/axiosConf";

export function sendMessage(message, token) {
    return axios.post('/message', message, {
        headers: {
            Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
        }
    })
}

export function getMessages(channelId, token){
    return axios.get(`/messages/channel/${channelId}`, {
        headers: {
            Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
        }
    })
}

export function getMessagesByUser(userId, token){
    return axios.get(`/messages/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
        }
    })
}