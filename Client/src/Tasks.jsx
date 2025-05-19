import { useQuery } from '@tanstack/react-query';
import { getTasks } from './queries/getTasks.jsx';
import { useState } from 'react';
import { Pagination } from './pagination/Pagination.jsx';

export function Tasks() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['tasks', currentPage, pageSize],
         queryFn: () => getTasks(currentPage, pageSize),
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

    function handlePageSizeChanged(pageSize) {
        setPageSize(pageSize);
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
          <select
            value={pageSize}
            onChange={e => {
            handlePageSizeChanged(Number(e.target.value));
            }}
            >
            <option key="5" value="5">5 Items</option>
            <option key="10" value="10">10 Items</option>
          </select>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={handlePageChanged}
          />
        </>
      );
}