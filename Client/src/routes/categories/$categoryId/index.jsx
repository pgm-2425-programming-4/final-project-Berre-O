import { createFileRoute, Link } from "@tanstack/react-router";
import { getCurrentCategory } from "../../../queries/getCurrentCategory.jsx";
import Form from "../../../components/Form.jsx";
import { useRef } from "react";

export const Route = createFileRoute("/categories/$categoryId/")({
  loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryId);
    return data.data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Category not found</div>,
});

function RouteComponent() {
  const categoryTasks = Route.useLoaderData().tasks;
  const category = Route.useLoaderData();

  const dialogRef = useRef(null);

  function openForm() {
    dialogRef.current?.showModal();
  }

  function closeForm() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div>
        <h2 key={category.documentId}>
          <Link
            to="/categories/$categoryId/backlog"
            params={{ categoryId: category.documentId }}
          >
            Backlog
          </Link>
        </h2>
      </div>

      <button onClick={openForm}>Open</button>

      <dialog ref={dialogRef}>
        <button onClick={closeForm}>Close</button>
        <Form 
          categoryId={category.documentId}
          categoryTitle={category.Title}
        />
      </dialog>

      <div style={{ marginBottom: "2rem" }}>
        <h2>UnCompleted</h2>
        <ul>
          {categoryTasks
            .filter((task) => task.task_status.CurrentStatus === "Uncomplete")
            .map((task) => (
              <li key={task.id}>
                <h2>{task.Title}</h2>
                <p>{task.category.Title}</p>
              </li>
            ))}
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>In Progress</h2>
        <ul>
          {categoryTasks
            .filter((task) => task.task_status.CurrentStatus === "Progress")
            .map((task) => (
              <li key={task.id}>
                <h2>{task.Title}</h2>
                <p>{task.category.Title}</p>
              </li>
            ))}
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Completed</h2>
        <ul>
          {categoryTasks
            .filter((task) => task.task_status.CurrentStatus === "Complete")
            .map((task) => (
              <li key={task.id}>
                <h2>{task.Title}</h2>
                <p>{task.category.Title}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
