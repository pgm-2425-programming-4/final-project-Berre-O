import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../../queries/getBacklog.jsx";
import { useState } from "react";
import { Pagination } from "../../../pagination/Pagination.jsx";

export const Route = createFileRoute("/categories/$categoryId/backlog")({
  component: Index,
});

function Index() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const categoryId = Route.useParams().categoryId;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks", currentPage, pageSize],
    queryFn: () => getTasks(currentPage, pageSize, categoryId),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const tasks = data.data;
  const totalTasks = data.meta?.pagination?.total || 0;
  const pageCount = Math.ceil(totalTasks / pageSize);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(pageSize) {
    setPageSize(pageSize);
  }

  return (
    <>
      <div class="backlog">
        <section className="card-group card-group--wide">
          <ul className="list list--task">
            {tasks.map((task) => (
              <li key={task.id} className="task">
                <h2 className="task__title task__title--big">{task.Title}</h2>
                <div className="task__info">
                <p className="task__description">{task.category?.Title}</p>
                  <div className="task__tags">
                    {task?.tags.map((tag) => (
                      <span key={tag.Title} className="task__tag">
                        {tag.Title}
                      </span>
                    ))}
                  </div>
                  </div>
                    <p className="task__description">{task?.Description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="pagination-container">
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              handlePageSizeChanged(newSize);
              setCurrentPage(1);
            }}
            className="dropdown"
          >
            <option key="5" value="5" className="dropdown__option">
              5 Items
            </option>
            <option key="10" value="10" className="dropdown__option">
              10 Items
            </option>
          </select>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChanged={handlePageChanged}
          />
        </section>
      </div>
    </>
  );
}
