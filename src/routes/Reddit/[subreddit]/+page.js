import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    const subreddit = params.subreddit;
    if (!subreddit) {
        throw error(404, {
            message: 'Not found'
        });
    }
    return {
        subreddit: subreddit
    };
}