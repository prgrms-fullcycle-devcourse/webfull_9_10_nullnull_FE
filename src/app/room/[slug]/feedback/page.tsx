"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { AppLogoLink } from "@/components/layout";
import {
  RoomFeedbackView,
  type RoomFeedbackResult,
} from "@/features/room/components/detail/RoomFeedbackView";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ result?: string }>;
};

export default function FeedbackRoute({ params, searchParams }: Props) {
  const { slug } = use(params);
  const { result } = use(searchParams);
  const router = useRouter();

  const feedbackResult: RoomFeedbackResult =
    result === "absent" ? "absent" : "waiting";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/room/${slug}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [slug, router]);

  return (
    <AppShell leftSlot={<AppLogoLink />}>
      <RoomFeedbackView result={feedbackResult} roomStatus="COLLECTING" />
    </AppShell>
  );
}
