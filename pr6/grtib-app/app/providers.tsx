"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { UserProvider } from "./user-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
  );
} 