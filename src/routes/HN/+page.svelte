<script>
    export let data;

    function truncate(text, length) {
        return text ? text.length > length ? text.substring(0, length) + "..." : text : "";
    }
</script>

<svelte:head>
	<title>HN: Top Six Today</title>
</svelte:head>

<div class="container">
    {#each data.posts as post}  
        <!-- {@debug post} -->
        <div class="post">
            <div class="post-content">
                <h2 class="post-title"><a href="https://news.ycombinator.com/item?id={post.objectID}" target="_blank">{post.title}</a></h2>
                <div class="post-text">{truncate(post.comment_text, 101)}</div>
                <div class="post-stats">🔼 {post.points} | 💬 {post.num_comments}</div>
            </div>
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
        display: flex;
        flex-direction: column;
    }
    .post-text {
        flex-grow: 1;
    }
</style>