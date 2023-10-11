export const prerender = true;

export async function load({ fetch }) {
	let posts = [];
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=6&numericFilters=points>100`);
    const data = await response.json();
    posts = data.hits;
	return {
        posts: posts
    }
}