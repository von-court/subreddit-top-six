import { error } from '@sveltejs/kit';
import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from '$env/static/private';

let accessToken: string;
let expirationTime: number;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return [
		{ subreddit: 'berlin' },
		{ subreddit: 'Notion' },
		{ subreddit: 'Berghain_Community' },
		{ subreddit: 'climatechange' },
		{ subreddit: 'Hyperhidrosis' },
		{ subreddit: 'memes' }
	];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const subreddit = params.subreddit;
	if (!subreddit) {
		throw error(404, {
			message: 'Not found'
		});
	}

	let posts = [];
	const token = await get_access_token();
	const headers = {
		'Authorization': `Bearer ${token}`
	};
	const response: Response = await fetch(`https://oauth.reddit.com/r/${subreddit}/top.json?limit=10&t=day`, { headers });
	const data = await response.json();
	posts = data.data.children.filter(post => !post.data.stickied).map(post => post.data).slice(0, 6);
	return {
		subreddit: subreddit,
		posts: posts
	};
}

async function get_access_token() {
	if (accessToken && expirationTime > Date.now()) {
		return accessToken;
	}

	const auth = 'Basic ' + Buffer.from(REDDIT_CLIENT_ID + ':' + REDDIT_CLIENT_SECRET).toString('base64');
	const response = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Authorization': auth,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'grant_type=client_credentials'
	});

	const data = await response.json();
	accessToken = data.access_token;
	expirationTime = Date.now() + (data.expires_in * 1000);
	return accessToken;
}

export const prerender = true;