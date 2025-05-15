import { StrictMode } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tasks } from './Tasks'

const queryClient = new QueryClient()

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Tasks />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
