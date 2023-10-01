<script lang="ts">
	import { copyText, generateLink } from '../../utils';
	import { LINK_TYPE } from '../types';
	import { buttonVariants } from '../ui/button';
	import Button from '../ui/button/button.svelte';
	import { Copy } from 'phosphor-svelte';
	import FormCard from './FormCard.svelte';
	import InputLabel from '../ui/input/input-label.svelte';
	let formValues = { generateUrl: '', url: '', title: '', description: '', source: '' };

	function handleSubmit(event: Event): void {
		event.preventDefault();
		formValues.generateUrl = generateLink(formValues, LINK_TYPE.LINKEDIN);
	}
	function handleInputChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		formValues[target.name] = target.value;
	}
</script>

<FormCard title="LinkedIn">
	<form on:submit={handleSubmit} class="flex flex-col gap-3">
		<InputLabel
			label="URL"
			type="url"
			id="url"
			placeholder="Url"
			name="url"
			helperText="Enter the url to share"
			value={formValues.url}
			on:change={handleInputChange}
		/>
		<InputLabel label="Title" name="title" value={formValues.title} on:change={handleInputChange} />
		<InputLabel
			label="Description (optional)"
			name="description"
			value={formValues.description}
			on:change={handleInputChange}
		/>
		<InputLabel
			label="Source (optional)"
			name="source"
			value={formValues.source}
			on:change={handleInputChange}
		/>
		<Button type="submit" class="w-full">Generate</Button>
		{#if formValues.generateUrl}
			<div class="flex content-evenly justify-evenly gap-3">
				<a
					href={formValues.generateUrl}
					class={buttonVariants({
						variant: 'outline',
						class: 'w-full break-all inline-block whitespace-normal h-full'
					})}
					target="_blank"
				>
					{formValues.generateUrl}
				</a>
				<Button
					type="button"
					variant="outline"
					size="icon"
					on:click={() => copyText(formValues.generateUrl)}
				>
					<Copy className="h-4 w-4" />
				</Button>
			</div>
		{/if}
	</form>
</FormCard>
