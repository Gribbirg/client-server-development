"use client";
import { useUser } from "../user-context";
import { hasRole } from "@/lib/auth";

export default function AdminPage() {
  const user = useUser();
  if (!user || !hasRole(user, ["admin"])) return <div>Нет доступа</div>;
  return <div>Страница администратора (Admin)</div>;
} 