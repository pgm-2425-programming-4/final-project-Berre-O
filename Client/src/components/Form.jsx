import React, { useState } from "react";
import { getCategories } from "../queries/getCategories.jsx";
import { useQuery } from "@tanstack/react-query";

function LoadForm(categoryTitle) {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryTitle);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const categories = data.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Title:", taskTitle);
    console.log("Selected Category:", selectedCategory);
    setTaskTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter a task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.documentId} value={category.Title}>
              {category.Title}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoadForm;
