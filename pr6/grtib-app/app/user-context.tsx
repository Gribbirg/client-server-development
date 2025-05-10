"use client";
import React, { createContext, useContext } from "react";
import type { User } from "@/lib/auth";

// Пример пользователя (можно заменить на получение из API/NextAuth)
const mockUser: User = {
  name: "Paimon",
  roles: ["user"],
  rights: ["can_view_articles"],
};

const UserContext = createContext<User | null>(mockUser);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={mockUser}>
      {children}
    </UserContext.Provider>
  );
} 