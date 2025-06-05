import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
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

  return (
    <>
      <aside className="aside">
        <nav className="nav">
          <Link to="/">
            <p className="nav__item">Home</p>
          </Link>
        </nav>
        <ul className="list">
          <h2 className="list__title">Projects</h2>
          {categories.map((category) => (
            <li key={category.documentId} className="list__item">
              <Link
                to="/categories/$categoryId"
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
