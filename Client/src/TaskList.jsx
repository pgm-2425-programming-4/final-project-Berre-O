import { useQuery } from '@tanstack/react-query';
import { getTasks } from './queries/getTasks.jsx';

export function TaskList() {
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tasks'],
        queryFn: getTasks,
    });

    if (isPending) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const tasks = data?.data || [];

    return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                <ul>
                    {tasks
                        .filter(task => task.task_status.CurrentStatus === "Uncomplete")
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