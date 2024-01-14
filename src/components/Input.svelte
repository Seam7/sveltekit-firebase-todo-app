<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let label: string;
	export let type: HTMLInputTypeAttribute = 'text';
	export let placeholder: string;
	export let inpValue: HTMLInputTypeAttribute;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<label for={label}>
	<p class={inpValue ? ' top' : ' center'}>{label}</p>
	<input bind:value={inpValue} use:typeAction {placeholder} />
</label>

<style>
	label {
		position: relative;
	}

	input {
		padding: 4px;
		margin-left: 6px;
		font-family: 'Jura', sans-serif;
	}

	.top,
	.center {
		position: absolute;
		transform: translateY(-50%);
		pointer-events: none;
		color: black;
		border-radius: 4px;
		padding: 0 6px;
		font-size: 0.8rem;
	}

	.top {
		top: 0;
		left: 24px;
		background-color: white;
		border: 1px solid gray;
		font-size: 0.7rem;
		font-family: 'Jura', sans-serif;
		font-weight: bolder;
	}

	.center {
		top: 50%;
		left: 6px;
		border: 1px solid transparent;
		opacity: 0;
	}
</style>
