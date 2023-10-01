<script>
    import { onMount } from 'svelte';
    let posts = [];
    let subredditName = 'berlin';

    onMount(async () => {
        const response = await fetch(`https://www.reddit.com/r/${subredditName}/hot.json?limit=10`);
        const data = await response.json();
        posts = data.data.children.filter(post => !post.data.stickied).map(post => post.data).slice(0, 6);
    });
</script>

<input bind:value={subredditName} placeholder="Enter subreddit name" />

{#each posts as post}
    <div class="post">
        <div class="post-title">{post.title}</div>
        <div>{post.selftext}</div>
        <div class="post-stats">🔼 {post.ups} | 💬 {post.num_comments}</div>
    </div>
{/each}

<style>
    .post {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .post-title {
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .post-stats {
        font-size: 0.9em;
        color: #888;
        margin-top: 10px;
    }
</style>
