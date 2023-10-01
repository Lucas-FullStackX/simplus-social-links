<script>
	import LinkedInForm from '$lib/components/Form/LinkedInForm.svelte';
	import TwitterForm from '$lib/components/Form/TwitterForm.svelte';
	import MainLayout from '$lib/components/layout/MainLayout.svelte';
</script>

<MainLayout>
	<div class=" flex flex-col gap-10 w-full">
		<div class="flex flex-col gap-4">
			<div
				class="text-5xl font-bold bg-gradient-to-b from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent"
			>
				Simplus Svelte Boilerplate
			</div>
			<div class="text-neutral-700">Simplus Svelte Boilerplate by Simplus Labs</div>
		</div>
		<div class="items-center flex flex-col gap-6 justify-center">
			<TwitterForm />
			<LinkedInForm />
		</div>
	</div>
</MainLayout>
