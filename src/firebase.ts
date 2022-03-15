import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import create from "zustand";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
};

// @ts-ignore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userStore = create((set: any) => ({
	user: null,
	login: (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password),
	logout: () => auth.signOut(),
	register: (email: string, password: string) =>
		createUserWithEmailAndPassword(auth, email, password),
}));

auth.onAuthStateChanged(async (user: any) => {
	if (user) {
		userStore.setState({ user });
	} else {
		userStore.setState({ user: null });
	}
});

export default userStore;
