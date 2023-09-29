<script>
	import Footer from '../Footer.svelte';

	import Header from '../Header.svelte';
	import OtherTools from '../OtherTools.svelte';
</script>

<Header />
<div class="flex justify-between px-4 py-14 lg:px-40 gap-20">
	<slot />

	<div class="hidden lg:block">
		<OtherTools />
	</div>
</div>
<Footer />
