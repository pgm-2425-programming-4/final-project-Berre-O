import { KEY, API_URL } from "../constants/constants.js";

export async function getTags() {
  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${KEY}`,
    },
  };

  const result = await fetch(`${API_URL}tags`, settings);
  const data = await result.json();

  return data;
}
