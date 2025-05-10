"use client";
import { useUser } from "../user-context";
import { hasRole } from "@/lib/auth";

export default function UserPage() {
  const user = useUser();
  if (!user || !hasRole(user, ["user"])) return <div>Нет доступа</div>;
  return <div>Страница пользователя (User)</div>;
} 