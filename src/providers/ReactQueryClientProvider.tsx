import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
});

export const ReactQueryClientProvider = ({children}: { children: ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
