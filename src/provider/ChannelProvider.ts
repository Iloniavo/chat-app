import {globalAxios as axios} from "../config/axiosConf";
import {getAllUsers} from "@/provider/AuthProvider";

export async function getChannels(token) {
    let req = await axios.get("/channels",
        {
            headers: {
                Authorization: `Bearer ${token}`
}
})
    return req.data.channels;
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

export function addChannelMembers(channelId, token, data) {
    return axios.post(`/channels/${channelId}/members`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function getUserById(id, token) {
    let allUsers = await getAllUsers(token)
    return allUsers.find((item) => item.id.toString() === id)
}