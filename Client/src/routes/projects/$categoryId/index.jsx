import { createFileRoute, Link } from "@tanstack/react-router";
import { getCurrentCategory } from "../../../queries/getCurrentCategory.jsx";
import Form from "../../../components/Form.jsx";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/projects/$categoryId/")({
  loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryId);
    return data.data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Category not found</div>,
});

function TaskSection({ title, tasks }) {
  let modifier = "";
  if (title === "To Do") {
    modifier = "background-container--blue";
  } else if (title === "Completed") {
    modifier = "background-container--green";
  } else if (title === "Under Review") {
    modifier = "background-container--purple";
  }

  return (
    <div className={`card-group`}>
      <div className={`background-container ${modifier}`}></div>
      <h2 className="card-group__title">{title}</h2>
      <ul className="list list--task">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <h2 className="task__title">{task.Title}</h2>
            <div className="task__info">
              <p className="task__description">{task?.Description}</p>
              <div className="task__tags">
                {task.tags.map((tag) => (
                  <span key={tag.Title} className="task__tag">
                    {tag.Title}
                  </span>
                ))}
              </div>
            </div>
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
    Uncomplete: "To Do",
    Progress: "In Progress",
    Review: "Under Review",
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
        <h1 className="header__title">Project Dashboard</h1>
        <div className="header__btns">
          <button onClick={openForm} className="btn header__btn">
            + Add task
          </button>
          <h2 className="btn header__btn">
            <Link
              to="/projects/$categoryId/backlog"
              params={{ categoryId: documentId }}
            >
              Backlog
            </Link>
          </h2>
        </div>
      </header>

      <dialog ref={dialogRef} onClose={closeForm} className="dialog">
        <div className="dialog__content">
          <div className="dialog__header">
            <h2 className="dialog__title">Add New Task</h2>
          </div>
          <Form
            categoryId={documentId}
            categoryTitle={Title}
            closeForm={closeForm}
          />
        </div>
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
