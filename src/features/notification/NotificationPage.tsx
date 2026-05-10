"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppContent, AppIconLink, AppShell } from "@/components/layout";

type Notification = {
  id: number;
  category: string;
  title: string;
  receivedAt: string;
  isNew?: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    category: "Category",
    title: "alarm title alarm title alarm title alar ...",
    receivedAt: "nn시간 전",
    isNew: true,
  },
  {
    id: 2,
    category: "Category",
    title: "alarm title alarm title alarm title alar ...",
    receivedAt: "nn시간 전",
  },
];

export function NotificationPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  return (
    <AppShell
      title="알림"
      leftSlot={
        <AppIconLink
          icon="back"
          label="뒤로가기"
          onClick={() => router.back()}
        />
      }
    >
      <AppContent>
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            className="text-xs font-medium leading-4 text-text-disabled"
            onClick={() => setNotifications([])}
          >
            모두 지우기
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </AppContent>
    </AppShell>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <article className="rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium leading-4 text-text-tertiary">
              {notification.category}
            </span>
            {notification.isNew && (
              <span className="flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold leading-none text-white">
                N
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-xs font-semibold leading-4 text-text-primary">
            {notification.title}
          </p>
        </div>
        <time className="shrink-0 pt-4 text-xs font-medium leading-4 text-text-tertiary">
          {notification.receivedAt}
        </time>
      </div>
    </article>
  );
}
