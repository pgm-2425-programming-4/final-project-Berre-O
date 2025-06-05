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
      <div className="p-2 flex gap-2">
        <Link to="/">Home</Link>
      </div>
      <div>
        <ul>
          {categories.map((category) => (
            <li key={category.documentId}>
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: category.documentId }}
              >
                <h2>{category.Title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
