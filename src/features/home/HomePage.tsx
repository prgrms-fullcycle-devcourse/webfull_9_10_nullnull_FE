"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { HomeDashboardView } from "./components/HomeDashboardView";
import { HomeLandingView } from "./components/HomeLandingView";

export function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return <HomeDashboardView userNickname={user?.nickname || "사용자"} />;
  }

  return <HomeLandingView />;
}
