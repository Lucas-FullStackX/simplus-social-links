<script lang="ts">
	import { copyText, generateLink } from '../../utils';
	import { LINK_TYPE } from '../types';
	import { buttonVariants } from '../ui/button';
	import Button from '../ui/button/button.svelte';
	import Textarea from '../ui/textarea/textarea.svelte';
	import { Copy } from 'phosphor-svelte';
	import FormCard from './FormCard.svelte';
	let formValues = { url: '', message: '' };

	function handleSubmit(event: Event): void {
		event.preventDefault();
		console.log(formValues);
		formValues.url = generateLink(formValues, LINK_TYPE.TWITTER);
	}
	function handleInputChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		formValues[target.name] = target.value;
	}
</script>

<FormCard title="Twitter | X">
	<form on:submit={handleSubmit} class="flex flex-col gap-3">
		<Textarea
			placeholder="Type your message here."
			name="message"
			value={formValues.message}
			on:change={handleInputChange}
		/>
		<Button type="submit" class="w-full">Generate</Button>
		{#if formValues.url}
			<div class="flex content-evenly justify-evenly gap-3">
				<a
					href={formValues.url}
					class={buttonVariants({ variant: 'outline', class: 'w-full' })}
					target="_blank"
				>
					{formValues.url}
				</a>
				<Button
					type="button"
					variant="outline"
					size="icon"
					on:click={() => copyText(formValues.url)}
				>
					<Copy className="h-4 w-4" />
				</Button>
			</div>
		{/if}
	</form>
</FormCard>
