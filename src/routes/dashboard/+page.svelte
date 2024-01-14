<script lang="ts">
	import { authHandlers, authStore } from '../../store/mainStore';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	let input = '';
	let todoList = $authStore.data.todos;

	authStore.subscribe((curr) => (todoList = curr.data.todos));

	const addTodo = () => {
		if (!input) {
			return;
		}

		todoList = [...todoList, input];
	};

	const deleteTodo = (index: number) => {
		const newTodoList = todoList.filter((_todo, i) => i !== index);
		todoList = newTodoList;
	};

	const saveToDb = async () => {
		try {
			const userRef = doc(db, 'user', $authStore.user!.uid);
			await setDoc(userRef, { todos: todoList }, { merge: true });
		} catch (error) {
			console.log('Error saving', error);
		}
	};

	const handleLogout = async () => {
		await authHandlers.logout();
	};
</script>

{#if $authStore.loading}
	LOADING
{:else}
	<div>
		<h1>TODOS</h1>
		<button on:click={saveToDb}>Save</button>
		<button on:click={handleLogout}>Log out</button>

		{#each todoList as todo, index}
			<p>{index + 1} - {todo} - <button on:click={() => deleteTodo(index)}>delete</button></p>
		{/each}

		<div class="todoInput">
			<input bind:value={input} placeholder="enter todo here" />
			<button on:click={addTodo}>create</button>
		</div>
	</div>
{/if}

<style>
	.todoInput {
		width: 100%;
	}
</style>
