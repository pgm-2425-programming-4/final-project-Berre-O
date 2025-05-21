import { useQuery } from '@tanstack/react-query';
import { getCurrentCategory } from './queries/getCurrentCategory.jsx';

export function TaskList({ currentCategory }) {
    console.log(currentCategory);
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tasks', currentCategory],
        queryFn: getCurrentCategory(currentCategory),
    });

    if (isPending) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }

        const category = data?.data
        const categoryTasks = category.tasks;
    
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