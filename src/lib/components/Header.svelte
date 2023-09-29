<script lang="ts">
	import { List, GithubLogo } from 'phosphor-svelte';
	import Button from './ui/button/button.svelte';
	import OtherTools from './OtherTools.svelte';
	import Logo from './Logo.svelte';

	let open = false;
</script>

<div class="sticky top-0 z-50">
	<div
		class="flex flex-col items-center justify-between px-4 py-3 lg:px-40 lg:flex-row bg-background/80 backdrop-blur-sm"
	>
		<div class="flex items-center justify-between w-full lg:w-auto">
			<a href="/">
				<Logo _class="h-14" />
			</a>
			<div class="md:hidden">
				<Button
					variant="outline"
					size="icon"
					on:click={() => {
						open = !open;
					}}
				>
					<List class="h-5 w-5" />
				</Button>
			</div>
		</div>
		<nav class="font-medium lg:flex items-center gap-4 hidden">
			<ul class="flex gap-4">
				<li>
					<a
						href="https://github.com/Simplus-Labs/"
						target="_blank"
						rel="noreferrer"
						class="flex items-center gap-2 transition-colors hover:text-primary text-foreground"
					>
						<GithubLogo size="20" weight="fill" />
						GitHub
					</a>
				</li>
				<li>
					<a
						href="https://simplus-labs.com"
						target="_blank"
						rel="noreferrer"
						class="transition-colors hover:text-primary text-foreground"
					>
						All the tools
					</a>
				</li>
				<li>
					<a href="/our-team" class="transition-colors hover:text-primary text-foreground">
						Our team
					</a>
				</li>
			</ul>
		</nav>
	</div>
	{#if open}
		<div
			class="fixed left-0 top-20 z-50 flex h-full w-full flex-col gap-6 px-4 py-2 lg:hidden bg-background/80 backdrop-blur-sm"
		>
			<nav class="font-medium gap-4 flex flex-col">
				<ul class="flex flex-col">
					<li>
						<a
							href="https://github.com/Simplus-Labs/"
							target="_blank"
							rel="noreferrer"
							class="flex items-center gap-2 transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
						>
							<GithubLogo size="20" weight="fill" />
							GitHub
						</a>
					</li>
					<li>
						<a
							href="https://simplus-labs.com"
							target="_blank"
							rel="noreferrer"
							class="flex items-center transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
						>
							All the tools
						</a>
					</li>
					<li>
						<a
							href="/our-team"
							class="flex items-center transition-colors hover:text-primary text-foreground border-b-[1px] py-3"
						>
							Our team
						</a>
					</li>
				</ul>
			</nav>
			<OtherTools />
		</div>
	{/if}
</div>
