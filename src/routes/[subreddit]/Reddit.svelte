<script>
    import { onMount } from 'svelte';
    let posts = [];
    export let subreddit = 'all';

    onMount(async () => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=10&t=day`);
        const data = await response.json();
        posts = data.data.children.filter(post => !post.data.stickied).map(post => post.data).slice(0, 6);
    });

    function truncate(text, length) {
        return text.length > length ? text.substring(0, length) + "..." : text;
    }
</script>

<svelte:head>
	<title>reddit: {subreddit}</title>
</svelte:head>

<div class="container">
    {#each posts as post}  
        {@debug post}
        <div class="post">
            <div class="post-content">
                <h2 class="post-title"><a href="https://reddit.com{post.permalink}" target="_blank">{post.title}</a></h2>
                <div>{truncate(post.selftext, 100)}</div>
                <div class="post-stats">🔼 {post.ups} | 💬 {post.num_comments}</div>
            </div>
            {#if post.thumbnail && post.thumbnail !== "self" && post.thumbnail !== "default"}
                <img src={post.thumbnail} alt="Post thumbnail" class="post-thumbnail" />
            {/if}
        </div>
    {/each}
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .post {
        display: flex;
        min-height: 5em;
        padding: 5px;
    }
    .post-title {
        margin-bottom: 10px;
        color: black;
    }
    .post-stats {
        font-size: 0.9em;
        color: #888;
    }
    .post-content {
        flex: 1;
    }
    .post-thumbnail {
        margin-left: 10px;
    }
</style>