import Home from "./pages/Home";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import AppRouter from "./router/router";

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      
      
      <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
    </>
  );
}

export default App;
