<script>
	import FacebookForm from '$components/Form/FacebookForm.svelte';
	import LinkedInForm from '$components/Form/LinkedInForm.svelte';
	import TwitterForm from '$components/Form/TwitterForm.svelte';
	import MainLayout from '$components/layout/MainLayout.svelte';
	import * as Tabs from '$components/ui/tabs';
</script>

<MainLayout>
	<div class=" flex flex-col gap-10 w-full">
		<div class="flex flex-col gap-4">
			<div
				class="text-5xl font-bold bg-gradient-to-b from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent"
			>
				Share Link Generator
			</div>
			<div class="text-neutral-700">Share Link Generator by Simplus Labs</div>
		</div>
		<Tabs.Root value="twitter" class="w-full">
			<Tabs.List class="w-full">
				<Tabs.Trigger value="twitter">Twitter | X</Tabs.Trigger>
				<Tabs.Trigger value="linkedin">LinkedIn</Tabs.Trigger>
				<Tabs.Trigger value="facebook">Facebook</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="twitter">
				<TwitterForm />
			</Tabs.Content>
			<Tabs.Content value="linkedin">
				<LinkedInForm />
			</Tabs.Content>
			<Tabs.Content value="facebook">
				<FacebookForm />
			</Tabs.Content>
			<!-- Telegram
			Whatsapp
			Email -->
		</Tabs.Root>
	</div>
</MainLayout>
