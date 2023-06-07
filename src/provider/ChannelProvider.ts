import {globalAxios as axios} from "../config/axiosConf";

export async function getChannels(token) {
    return await axios.get("/channels",
        {
            headers: {
                Authorization: `Bearer ${token}`
}
})
}

export async function getChannelById(id, token) {
    let req = await axios.get(`/channel/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return req.data.channel;
}

export function createChannel(channel, token) {
    return axios.post('/channel', channel, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function addChannelMembers(channelId, token) {
    return axios.post(`/channels/${channelId}/members`, {
        headers: {
            Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
        }
    })
}

export function getChannelByOwner(token){
    return axios.get('/channels/user', {
        headers: {
            Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
        }
    })
}