import { useRouter } from "@tanstack/react-router";
import React, { useState } from "react";
import { getCategories } from "../queries/getCategories.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../queries/getTags.jsx";
import { getStates } from "../queries/getStates.jsx";
import { postTask } from "../queries/postTask.jsx";

function LoadForm({ categoryId, closeForm }) {
  const router = useRouter();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      data: {
        Title: taskTitle,
        Description: taskDescription,
        category: selectedCategory,
        task_status: selectedState,
        tags: selectedTags,
      },
    };

    try {
      await postTask(data);
      await router.invalidate();

      setTaskTitle("");
      setTaskDescription("");
      setSelectedCategory("");
      setSelectedState("");
      setSelectedTags([]);
      closeForm();
    } catch (error) {
      console.error("Failed to post task:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
      required
        className="form__input form__input--text"
        type="text"
        id="title"
        name="title"
        placeholder="Enter a task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <textarea
      required
        className="form__textarea"
        id="description"
        name="description"
        placeholder="Enter a task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />

      <label htmlFor="category">Project</label>
      <select
      required
        className="dropdown"
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option
            className="dropdown__option"
            key={category.documentId}
            value={category.documentId}
          >
            {category.Title}
          </option>
        ))}
      </select>

      <select
      required
        className="dropdown"
        id="states"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option className="dropdown__option" value="">
          --Select a state
        </option>
        {states.map((state) => (
          <option
            className="dropdown__option"
            key={state.documentId}
            value={state.documentId}
          >
            {state.CurrentStatus}
          </option>
        ))}
      </select>

      <div className="form__checkboxes">
        {tags.map((tag) => (
          <label className="checkbox" key={tag.documentId}>
            <input
              className="checkbox__input"
              type="checkbox"
              value={tag.documentId}
              checked={selectedTags.includes(tag.documentId)}
              onChange={handleTagChange}
            ></input>
            {tag.Title}
          </label>
        ))}
      </div>

      <div className="form__btns">
        <button type="submit" className="btn">
          Submit
        </button>
        <button onClick={closeForm} className="btn btn--destructive">
          Close
        </button>
      </div>
    </form>
  );
}

export default LoadForm;
