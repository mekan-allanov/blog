import axios from "axios";
import { LoginCredentials, Post, RegisterCredentials } from ".";
import { useAuthStore } from "../stores/useAuthStore";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const auth = {
	login: async (credentials: LoginCredentials) => {
		const { data } = await api.post("/auth/login", credentials);
		return data;
	},
	register: async (credentials: RegisterCredentials) => {
		const { data } = await api.post("/auth/register", credentials);
		return data;
	},
	logout: () => {
		localStorage.removeItem("token");
	},
};

export const posts = {
	getAll: async () => {
		const { data } = await api.get<Post[]>("/posts");
		return data;
	},
	getById: async (id: string) => {
		const { data } = await api.get<Post>(`/posts/${id}`);
		return data;
	},
	create: async (post: Partial<Post>) => {
		const { data } = await api.post<Post>("/posts", post);
		return data;
	},
	update: async (id: string, post: Partial<Post>) => {
		const { data } = await api.put<Post>(`/posts/${id}`, post);
		return data;
	},
	delete: async (id: string) => {
		await api.delete(`/posts/${id}`);
	},
};

export default api;
