"use client";

import {
  QueryClient,
  QueryClientProvider,
  type QueryFunction,
} from "@tanstack/react-query";
import axios from "axios";

import { type PropsWithChildren } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
  let browserQueryClient: QueryClient | undefined = undefined;

  const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
    const path = queryKey.join("/");

    const response = await axios.get(`/${path}`);

    return response.data;
  };

  function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
          staleTime: 60 * 1000,
        },
      },
    });
  }

  function getQueryClient() {
    if (typeof window === "undefined") {
      // Server: always make a new query client
      return makeQueryClient();
    } else {
      // Browser: make a new query client if we don't already have one
      // This is very important so we don't re-make a new client if React
      // suspends during the initial render. This may not be needed if we
      // have a suspense boundary BELOW the creation of the query client
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
    }
  }

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
