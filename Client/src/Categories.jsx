import { useQuery } from '@tanstack/react-query';
import { getCategories } from './queries/getCategories.jsx';
import { useState } from 'react';
import { TaskList } from './TaskList.jsx';

export function Categories() {
    const [currentCategory, setCurrentCategory] = useState(null);

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


    const selectedCategoryId = currentCategory ?? categories[0]?.documentId;

    return (
        <>
            <div style={{ marginBottom: "2rem" }}>
                <h2>Categories</h2>
                <ul>
                    {categories.map(category => (
                        <li
                            key={category.id}
                            onClick={() => setCurrentCategory(category.id)}
                        >
                            <h2>{category.Title}</h2>
                        </li>
                    ))}
                </ul>
            </div>
            <TaskList currentCategory={selectedCategoryId} />
        </>
    );
}
