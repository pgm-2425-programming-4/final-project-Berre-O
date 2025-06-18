import { KEY, API_URL } from "../constants/constants.js";

export async function updateTask(postData, id) {
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${KEY}`,
    },
    body: JSON.stringify(postData),
  };

  const result = await fetch(`${API_URL}tasks/${id}`, settings);
  if(result.ok) {
    return result
  }
}