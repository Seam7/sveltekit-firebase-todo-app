<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authStore } from '../store/mainStore';

	const nonAuthRoutes = ['/'];

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (!user) {
				return;
			}

			if (user && currentPath === '/') {
				window.location.href = '/dashboard';
				return;
			}

			const docRef = doc(db, 'user', user!.uid);
			const docSnap = await getDoc(docRef);
			let dataForStore: any;

			if (!docSnap.exists()) {
				const userRef = doc(db, 'user', user!.uid);
				dataForStore = {
					email: user?.email,
					todos: []
				};
				await setDoc(userRef, dataForStore, { merge: true });
			} else {
				const userData = docSnap.data();
				dataForStore = userData;
			}

			authStore.update((curr) => ({
				...curr,
				user,
				data: dataForStore,
				loading: false
			}));
		});
	});
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		min-height: 100vh;
		color: black;
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>
