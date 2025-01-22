export interface User {
	id: string;
	email: string;
	name: string;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	author: User;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials extends LoginCredentials {
	name: string;
}
