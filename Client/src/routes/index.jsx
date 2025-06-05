import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { TaskList } from '../TaskList.jsx';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
        <>
        <div className="p-2 flex gap-2">
            Select a Category
            </div>
        </>
        )
}
