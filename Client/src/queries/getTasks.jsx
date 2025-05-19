import { KEY, API_URL } from '../constants/constants.js';

export async function getTasks(currentPage, pageSize) {
    const result = await fetch(`${API_URL}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${KEY}`
    }});

        const data = await result.json();
        return data;
}