import { createFileRoute } from '@tanstack/react-router'
import { getCurrentCategory } from '../../queries/getCurrentCategory.jsx';

export const Route = createFileRoute('/categories/$categoryTitle')({
    loader: async ({ params }) => {
    const data = await getCurrentCategory(params.categoryTitle);
    return data.data.tasks;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Student not found</div>,
})

function RouteComponent() {
  const categoryTasks = Route.useLoaderData();
    return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                <h2>UnCompleted</h2>
                <ul>
                    {categoryTasks
                        .filter(task => task.task_status.CurrentStatus === "Uncomplete")
                        .map(task => (
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
                        .filter(task => task.task_status.CurrentStatus === "Progress")
                        .map(task => (
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
                        .filter(task => task.task_status.CurrentStatus === "Complete")
                        .map(task => (
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
