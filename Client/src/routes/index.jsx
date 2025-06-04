import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../queries/getCategories.jsx';
import { TaskList } from '../TaskList.jsx';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
        const { isPending, isError, data, error } = useQuery({ 
            queryKey: ['categories'],
            queryFn: getCategories,
        });
    
        if (isPending) {
            return <span>Loading...</span>;
        }
        if (isError) {
            return <span>Error: {error.message}</span>;
        }
    
        const categories = data?.data || [];
  return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                    <h2>Categories</h2>
                <ul>
                    {categories.map(category => (
                    <li key={category.documentId}>
                    <Link to="/categories/$categoryId" params={{ categoryId: category.documentId }}>
                    <h2>{category.Title}</h2>
                    </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </>
        )
}
