import { auth } from '$lib/firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User
} from 'firebase/auth';
import { writable } from 'svelte/store';

type AuthStore = {
	user: User | null;
	loading: boolean;
	data: any;
};

export const authStore = writable<AuthStore>({ user: null, loading: true, data: {} });

export const authHandlers = {
	signup: async (email: string, pass: string) => {
		await createUserWithEmailAndPassword(auth, email, pass);
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logout: async () => {
		await signOut(auth);
	}
};
