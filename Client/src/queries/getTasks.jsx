import { KEY, API_URL } from '../constants/constants.js';

export async function getTasks(currentPage) {
    const result = await fetch(`${API_URL}&pagination[page]=${currentPage}&pagination[pageSize]=4`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${KEY}`
    }});

        const data = await result.json();
        return data;
}