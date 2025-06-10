import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="main__container">
        <h1 className="main__title">Select a Category</h1>
      </div>
    </>
  );
}
