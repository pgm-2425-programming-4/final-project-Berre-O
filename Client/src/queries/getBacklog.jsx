import { KEY, API_URL } from "../constants/constants.js";

export async function getTasks(currentPage, pageSize, categoryId) {
  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${KEY}`,
    },
  };

  const result = await fetch(
    `${API_URL}tasks?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&filters[task_status][CurrentStatus]=Backlog&filters[category][documentId]=${categoryId}`,
    settings
  );
  const data = await result.json();
  return data;
}
