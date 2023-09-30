<script lang="ts">
	import * as Card from '../ui/card';
	export let title = 'Twitter | X ';
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>Create Share Link</Card.Description>
	</Card.Header>
	<Card.Content>
		<slot />
	</Card.Content>
</Card.Root>
