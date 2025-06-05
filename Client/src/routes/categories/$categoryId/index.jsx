import { createFileRoute, Link } from "@tanstack/react-router";
import { getCurrentCategory } from "../../../queries/getCurrentCategory.jsx";

export const Route = createFileRoute("/categories/$categoryId/")({
  loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryId);
    return data.data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Student not found</div>,
});

function RouteComponent() {
  const categoryTasks = Route.useLoaderData().tasks;
  const category = Route.useLoaderData();

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
        <h2>UnCompleted</h2>
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
