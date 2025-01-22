// src/stores/usePostStore.ts
import { create } from "zustand";
import { Post } from "../lib";
import { posts } from "../lib/api";

interface PostStore {
	posts: Post[];
	isLoading: boolean;
	error: string | null;
	fetchPosts: () => Promise<void>;
	createPost: (post: Partial<Post>) => Promise<void>;
	updatePost: (id: string, post: Partial<Post>) => Promise<void>;
	deletePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostStore>(set => ({
	posts: [],
	isLoading: false,
	error: null,

	fetchPosts: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await posts.getAll();
			set({ posts: response, isLoading: false });
		} catch (error) {
			set({ error: "Failed to fetch posts", isLoading: false });
			console.error(error);
		}
	},

	createPost: async post => {
		set({ isLoading: true, error: null });
		try {
			const newPost = await posts.create(post);
			set(state => ({
				posts: [...state.posts, newPost],
				isLoading: false,
			}));
		} catch (error) {
			set({ error: "Failed to create post", isLoading: false });
			console.error(error);
		}
	},

	updatePost: async (id, post) => {
		set({ isLoading: true, error: null });
		try {
			const updatedPost = await posts.update(id, post);
			set(state => ({
				posts: state.posts.map(p => (p.id === id ? updatedPost : p)),
				isLoading: false,
			}));
		} catch (error) {
			set({ error: "Failed to update post", isLoading: false });
			console.error(error);
		}
	},

	deletePost: async id => {
		set({ isLoading: true, error: null });
		try {
			await posts.delete(id);
			set(state => ({
				posts: state.posts.filter(p => p.id !== id),
				isLoading: false,
			}));
		} catch (error) {
			set({ error: "Failed to delete post", isLoading: false });
			console.error(error);
		}
	},
}));
