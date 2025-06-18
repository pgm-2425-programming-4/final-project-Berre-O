import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../../queries/getTags.jsx";
import { getCurrentCategory } from "../../../queries/getCurrentCategory.jsx";
import Form from "../../../components/Form.jsx";
import { useRef, useState, useEffect } from "react";
import TaskSection from "../../../components/TaskSection.jsx";
import ModalPortal from "../../../components/ModalPortal.jsx";

export const Route = createFileRoute("/projects/$categoryId/")({
  loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryId);
    return data.data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Category not found</div>,
});

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

  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery({
    queryKey: ["Tags"],
    queryFn: () => getTags(),
  });

  console.log(tagsData);

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
          <select defaultValue="">
            <option value="">-- All tasks --</option>
            {!tagsLoading &&
              !tagsError &&
              tagsData.data?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.Title}
                </option>
              ))}
          </select>
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
