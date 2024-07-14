import { RouterProvider } from 'react-router-dom'
import { appRouter } from './route/Route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools />
      <Toaster />
    </QueryClientProvider>
  )
}
export default App
