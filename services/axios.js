import axios from 'axios';

export const API = axios.create({
	baseURL: "https://kitsu.io/api/edge"
})
