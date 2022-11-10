import axios from 'axios';

const baseUrl = 'http://localhost:5000/posts';

export const getPosts = (params) => axios.get(baseUrl, { params });

export const getPostsId = (id) => axios.get(`${baseUrl}/${id}`);

export const createPost = (data) => axios.post(baseUrl, data);
export const updatePost = (id, data) => axios.put(`${baseUrl}/${id}`, data);
export const deletePost = (id) => axios.delete(`${baseUrl}/${id}`);
