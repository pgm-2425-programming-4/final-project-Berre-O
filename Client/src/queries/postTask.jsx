import { KEY, API_URL } from "../constants/constants.js";

export async function postTask(postData) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${KEY}`,
    },
    body: JSON.stringify(postData),
  };

  const result = await fetch(`${API_URL}tasks`, settings);
  const data = await result.json();
  return data;
}
