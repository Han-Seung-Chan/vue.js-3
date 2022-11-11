import { posts } from '.';

export const getPostsId = (id) => posts.get(`/${id}`);

export const getPosts = (params) => posts.get(`/`, { params });
export const createPost = (data) => posts.post('', data);
export const updatePost = (id, data) => posts.put(`/${id}`, data);
export const deletePost = (id) => posts.delete(`/${id}`);
