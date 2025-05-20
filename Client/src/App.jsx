import { StrictMode } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TaskList } from './TaskList.jsx'

const queryClient = new QueryClient()

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
