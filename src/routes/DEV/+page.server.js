export const prerender = true;

export async function load({ fetch }) {
    const response = await fetch(`https://dev.to/api/articles?top=1&per_page=6`);
    const data = await response.json();
	return {
        posts: data
    }
}