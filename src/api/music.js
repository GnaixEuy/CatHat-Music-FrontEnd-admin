import { get, post, put } from './request.js';

export const list = () => get('/musics');

export const create = music => post('/musics', music);

export const update = (id, music) => put(`/musics/${id}`, music);

export const publish = id => post(`/musics/${id}/publish`);

export const close = id => post(`/musics/${id}/close`);