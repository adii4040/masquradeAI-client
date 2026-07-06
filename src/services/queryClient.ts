import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: false,
        },
        mutations: {
            retry: false,
        },
    },
});
