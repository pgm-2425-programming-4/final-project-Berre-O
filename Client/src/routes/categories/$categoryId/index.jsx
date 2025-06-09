import { createFileRoute, Link } from "@tanstack/react-router";
import { getCurrentCategory } from "../../../queries/getCurrentCategory.jsx";
import Form from "../../../components/Form.jsx";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/categories/$categoryId/")({
  loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryId);
    return data.data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Category not found</div>,
});

function TaskSection({ title, tasks }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.Title}</h2>
            <p>{task.category.Title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RouteComponent() {
  const { tasks = [], documentId, Title } = Route.useLoaderData();
  const dialogRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showForm]);

  const closeForm = () => setShowForm(false);
  const openForm = () => setShowForm(true);

  const statusMap = {
    Uncomplete: "UnCompleted",
    Progress: "In Progress",
    Complete: "Completed",
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const status = task.task_status.CurrentStatus;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});

  return (
    <>
      <div>
        <h2>
          <Link
            to="/categories/$categoryId/backlog"
            params={{ categoryId: documentId }}
          >
            Backlog
          </Link>
        </h2>
      </div>

      <button onClick={openForm}>Open</button>

      <dialog ref={dialogRef} onClose={closeForm}>
        <button onClick={closeForm}>Close</button>
        <Form
          categoryId={documentId}
          categoryTitle={Title}
          closeForm={closeForm}
        />
      </dialog>

      {Object.entries(statusMap).map(([statusKey, label]) => (
        <TaskSection
          key={statusKey}
          title={label}
          tasks={groupedTasks[statusKey] || []}
        />
      ))}
    </>
  );
}