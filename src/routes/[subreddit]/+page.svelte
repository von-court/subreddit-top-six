<script>
	import Reddit from './Reddit.svelte';
	export let data;
</script>

<section>
	<Reddit subreddit={data.subreddit}/>
</section>
