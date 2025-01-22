import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginCredentials, RegisterCredentials, User } from "../lib";
import { auth } from "../lib/api";

interface AuthStore {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			user: null,
			token: null,
			isAuthenticated: false,

			login: async credentials => {
				try {
					const response = await auth.login(credentials);
					set({
						user: response.user,
						token: response.token,
						isAuthenticated: true,
					});
				} catch (error) {
					console.error("Login failed", error);
				}
			},

			register: async credentials => {
				try {
					const response = await auth.register(credentials);
					set({
						user: response.user,
						token: response.token,
						isAuthenticated: true,
					});
				} catch (error) {
					console.error("Registration failed", error);
				}
			},

			logout: () => {
				auth.logout();
				set({
					user: null,
					token: null,
					isAuthenticated: false,
				});
			},
		}),
		{
			name: "auth-storage",
			partialize: state => ({ token: state.token }),
		}
	)
);
