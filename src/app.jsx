/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

import {
  QueryClient,
  QueryClientProvider,
  } from '@tanstack/react-query'




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Disable refetch on window focus
      staleTime: 5000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    }
  },
});



// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
      <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
