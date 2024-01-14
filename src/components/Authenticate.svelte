<script lang="ts">
	import Input from './Input.svelte';
	import { authHandlers } from '../store/mainStore';

	let login = true;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let authenticating = false;

	const toggleLogin = () => (login = !login);

	const submitLogin = async () => {
		console.log({ email, password, confirmPassword });
		if (!login && password !== confirmPassword) {
			return;
		}

		if (authenticating) {
			return;
		}
		authenticating = true;

		try {
			if (login) {
				await authHandlers.login(email, password);
				console.log('honky dory');
			} else {
				await authHandlers.signup(email, password);
				console.log('also honky dory');
			}
		} catch (error) {
			console.log('Auth error', error);
		}
		authenticating = false;
	};
</script>

<div>
	<h1>{login ? 'Login' : 'Register'}</h1>
	<form>
		<Input bind:inpValue={email} label="Email" type="text" placeholder="Email" />
		<Input bind:inpValue={password} label="Password" type="password" placeholder="Password" />
		{#if !login}
			<Input
				bind:inpValue={confirmPassword}
				label="Confirm Password"
				type="password"
				placeholder="Confirm Password"
			/>
		{/if}
		<button type="button" on:click={submitLogin} disabled={authenticating}>Submit</button>
		<button type="button" on:click={() => toggleLogin()}
			>{login ? 'Create account' : 'Back to login'}</button
		>
	</form>
</div>

<style>
	h1 {
		font-family: 'Luckiest Guy', cursive;
		margin: 8px;
	}

	form {
		display: flex;
		gap: 8px;
	}

	button {
		background-color: darkgray;
		border: none;
		padding: 6px 8px;
		border-radius: 3px;
		color: white;
	}

	button:hover {
		background-color: gray;
	}
</style>
