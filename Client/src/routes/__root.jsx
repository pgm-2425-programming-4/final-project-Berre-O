import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { getCategories } from "../queries/getCategories.jsx";

export const Route = createRootRoute({
  loader: async () => {
    const res = await getCategories();
    const data = res?.data || [];
    return data;
  },

  component: RootLayout,
});

function RootLayout() {
  const categories = Route.useLoaderData();
  const selectedCategoryId = useRouterState({
    select: (state) =>
      state.matches.find((m) => "categoryId" in (m.params || {}))?.params
        ?.categoryId,
  });

  return (
    <>
      <aside className="aside">
        <div className="aside__logo">
          <Link to="/">
            <p className="aside__title">Project manager</p>
          </Link>
        </div>
        <ul className="list">
          <h2 className="list__title">Active Projects</h2>
          {categories.map((category) => (
            <li
              key={category.documentId}
              className={
                "list__item list__item--category" +
                (selectedCategoryId === category.documentId
                  ? " list__item--active"
                  : "")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.73 3L18 18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
              </svg>
              <Link
                to="/projects/$categoryId"
                params={{ categoryId: category.documentId }}
              >
                <h3 className="list__item-title">{category.Title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="main">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </>
  );
}
