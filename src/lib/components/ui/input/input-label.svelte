<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$utils';
	import type { InputEvents } from '.';
	import Label from '../label/label.svelte';

	type $$Props = HTMLInputAttributes & {
		label?: string;
		helperText?: string;
	};
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let helperText: $$Props['helperText'] = undefined;
	export let label: $$Props['label'] = undefined;
	export { className as class };
</script>

<div class="flex flex-col w-full gap-1.5">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<input
		class={cn(
			'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
	{#if helperText}
		<p class="text-sm text-muted-foreground">{helperText}</p>
	{/if}
</div>
