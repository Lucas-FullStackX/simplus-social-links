<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';
	import toolsData from '../../../tools-data.json';
	import type { BadgeInfo, Tool } from './types';
	import Button from './ui/button/button.svelte';
	import { Badge } from './ui/badge';
	const isNew = (createdAt: string): boolean => {
		const currentDate = new Date();
		const toolDate = new Date(createdAt);
		const oneMonth = 30 * 24 * 60 * 60 * 1000;

		return currentDate.getTime() - toolDate.getTime() < oneMonth;
	};
	const getBadgeInfo = (tool: Tool): BadgeInfo | null => {
		if (!tool.active) {
			return { text: 'Coming Soon', variant: 'secondary' };
		} else if (isNew(tool.created_at)) {
			return { text: 'New', variant: 'radiant' };
		}
		return null;
	};
</script>

<div class="w-full lg:w-72 py-2 flex flex-col gap-6">
	<div class="flex justify-between items-center">
		<div class="font-bold">Other tools</div>
		<Button variant="outline" class="border-primary font-medium">
			See more <CaretRight class="ml-2 h-4 w-4" />
		</Button>
	</div>
	<ul class="flex flex-col gap-4">
		{#each toolsData as tool}
			<li class="flex gap-3">
				<a
					href={tool.url}
					target="_blank"
					rel="noreferrer"
					class="flex gap-3 items-center underline transition-colors hover:text-primary text-foreground"
				>
					<img src={tool.logo} alt={`${tool.name} logo`} class="h-6" />
					{tool.name}
				</a>
				{#if getBadgeInfo(tool) !== null}
					<Badge variant={getBadgeInfo(tool).variant}>{getBadgeInfo(tool).text}</Badge>
				{/if}
			</li>
		{/each}
	</ul>
</div>
