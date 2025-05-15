import { KEY, API_URL } from '../constants/constants.js';

export async function getTasks() {
    const result = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${KEY}`
    }});

        const data = await result.json();
        return data.data;
}