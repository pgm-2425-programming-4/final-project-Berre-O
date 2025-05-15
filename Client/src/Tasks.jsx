import { useQuery } from '@tanstack/react-query';
import { getTasks } from './queries/getTasks.jsx';
import { useState } from 'react';
import { Pagination } from './pagination/Pagination.jsx';

export function Tasks() {
    const [currentPage, setCurrentPage] = useState(1);
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tasks', currentPage],
         queryFn: () => getTasks(currentPage),
         });
         
         
        if (isPending) {
            return <span>Loading...</span>;
        }
        if (isError) {
            return <span>Error: {error.message}</span>;
        }
            
    const tasks = data.data;
    const totalTasks = data.meta?.pagination?.total || 0;
    const pageCount = Math.ceil(totalTasks / 4);
    console.log(pageCount)
    console.log(data);

    function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
    }

      return (
        <>
          <div style={{ marginBottom: "2rem" }}>
            <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h2>{task.Title}</h2>
                    <p>{task.category.Title}</p>
                </li>
            ))}
            </ul>
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={handlePageChanged}
          />
        </>
      );
}