export const prerender = true;

export async function load({ fetch }) {
	let posts = [];
    const oneDayInSeconds = 24 * 60 * 60;
    const timestampOneDayAgo = Math.floor((Date.now() - oneDayInSeconds * 1000) / 1000);
    const response = await fetch(`http://hn.algolia.com/api/v1/search?hitsPerPage=6&numericFilters=created_at_i>${timestampOneDayAgo},points>100`);
    const data = await response.json();
    posts = data.hits;
	return {
        posts: posts
    }
}