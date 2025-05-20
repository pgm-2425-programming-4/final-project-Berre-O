import { KEY, API_URL } from '../constants/constants.js';

export async function getTasks(currentPage, pageSize) {
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${KEY}`
    }};

    const result = await fetch(`${API_URL}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&filters[task_status][CurrentStatus]=Backlog`, settings);
        const data = await result.json();
        return data;
}