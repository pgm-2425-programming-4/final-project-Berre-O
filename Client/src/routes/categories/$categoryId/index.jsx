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
    <div className="card-group">
      <h2 className="card-group__title">{title}</h2>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="list__item list__item--bordered">
            <h2 className="list__item-title">{task.Title}</h2>
            <p className="list__description">{task.category.Title}</p>
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
      <header className="header">
        <div className="header__btns">
          <h2 className="btn header__btn">
            <Link
              to="/categories/$categoryId/backlog"
              params={{ categoryId: documentId }}
            >
              Backlog
            </Link>
          </h2>
          <button onClick={openForm} className="btn header__btn">
            + Add task
          </button>
        </div>
      </header>

      <dialog ref={dialogRef} onClose={closeForm} className="dialog">
        <button onClick={closeForm} className="btn btn--destructive">Close</button>
        <Form
          categoryId={documentId}
          categoryTitle={Title}
          closeForm={closeForm}
        />
      </dialog>


          <section className="container">
      {Object.entries(statusMap).map(([statusKey, label]) => (
        <TaskSection
          key={statusKey}
          title={label}
          tasks={groupedTasks[statusKey] || []}
        />
      ))}
      </section>
    </>
  );
}
