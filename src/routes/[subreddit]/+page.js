
import { error } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    try {
        return {
            subreddit: params.subreddit
        };
    } catch (err) {
        throw error(404, 'Not found');
    }

}