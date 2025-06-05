import React, { useState } from "react";
import { getCategories } from "../queries/getCategories.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../queries/getTags.jsx";
import { getStates } from "../queries/getStates.jsx";
import { postTask } from "../queries/postTask.jsx"

function LoadForm({categoryTitle, closeForm}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryTitle);
  const [selectedState, setSelectedState] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
    error: tagsErrorObj,
  } = useQuery({
    queryKey: ["Tags"],
    queryFn: () => getTags(),
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorObj,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const {
    data: statusData,
    isLoading: statusLoading,
    isError: statusError,
    error: statusErrorObj,
  } = useQuery({
    queryKey: ["task-statuses"],
    queryFn: () => getStates(),
  });

  if (tagsLoading || categoriesLoading || statusLoading) {
    return <span>Loading...</span>;
  }
  if (tagsError) {
    return <span>Error: {tagsErrorObj.message}</span>;
  }
  if (categoriesError) {
    return <span>Error: {categoriesErrorObj.message}</span>;
  }
  if (statusError) {
    return <span>Error: {statusErrorObj.message}</span>;
  }

  const categories = categoriesData.data || [];
  const tags = tagsData?.data || tagsData || [];
  const states = statusData?.data || statusData || [];

  const handleTagChange = (e) => {
    const tagId = e.target.value;
    setSelectedTags((prev) =>
      e.target.checked ? [...prev, tagId] : prev.filter((id) => id !== tagId)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      data: {
      Title: taskTitle,
      category: selectedCategory,
      task_status: selectedState,
      tags: selectedTags,
      }
    };
    postTask(data);

  setTaskTitle("");
  setSelectedCategory("");
  setSelectedState("");
  setSelectedTags([]);

  closeForm();
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
            <option key={category.documentId} value={category.documentId}>
              {category.Title}
            </option>
          ))}
        </select>

        <select
          id="states"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {states.map((state) => (
            <option key={state.documentId} value={state.documentId}>
              {state.CurrentStatus}
            </option>
          ))}
        </select>

        {tags.map((tag) => (
          <label key={tag.documentId}>
            {tag.Title}
            <input
              type="checkbox"
              value={tag.documentId}
              checked={selectedTags.includes(tag.documentId)}
              onChange={handleTagChange}
            ></input>
          </label>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoadForm;
