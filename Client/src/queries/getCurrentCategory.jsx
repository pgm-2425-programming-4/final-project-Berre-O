import { KEY, API_URL } from '../constants/constants.js';

export async function getCurrentCategory() {
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${KEY}`
    }};

    const result = await fetch(`${API_URL}categories/${currentCategory}populate[tasks][populate]=*`, settings);
        const data = await result.json();

        return data;
}