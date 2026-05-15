import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppHeader } from "./AppHeader";
import { FixedBottom } from "./FixedBottom";
import Image from "next/image";
import pcBg from "@/assets/images/pc.png";
import {
  Share,
  MoreVertical,
  Clock,
  Calendar,
  Users,
  MapPin,
} from "lucide-react";

type Props = {
  title?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
  bottomReserveClassName?: string;
  bottomContentClassName?: string;
  children: ReactNode;
};

export function AppShell({
  title,
  leftSlot,
  rightSlot,
  bottomSlot,
  bottomReserveClassName,
  bottomContentClassName,
  children,
}: Props) {
  return (
    <div className="Wrap min-h-dvh lg:h-dvh lg:overflow-hidden overflow-x-hidden bg-background">
      {/* PC Background Image (Full Screen) */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none overflow-hidden">
        <Image
          src={pcBg}
          alt="PC Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Custom Branding Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(101, 70, 255, 0.78) 0%, rgba(101, 70, 255, 0) 76%)",
          }}
        />
        {/* Subtle brightness adjustment */}
        <div className="absolute inset-0 bg-black/5 backdrop-brightness-[0.98]" />
      </div>

      {/* Background Blobs (Overlaying on top of the image for atmosphere) */}
      <div className="blob-container hidden lg:block opacity-60">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="blob blob-5" />
      </div>

      {/* PC Branding Section */}
      <aside className="pc-branding relative hidden lg:flex flex-1 flex-col justify-between overflow-hidden h-full z-10 py-16 px-16 xl:px-24">
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          {/* Brand Logo (Custom NN Logo from icon.css) */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[var(--color-primary-default)] rounded-[22px] flex items-center justify-center shadow-2xl shadow-black/30 border-2 border-white/20">
              <div
                className="w-11 h-11 bg-white"
                style={{
                  maskImage: "var(--ico-logo)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "var(--ico-logo)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            </div>
          </div>

          {/* Main Slogan (Replaced Image with Styled Text) */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[52px] xl:text-[60px] font-black leading-[1.15] tracking-[-0.04em] text-white">
              <span className="inline-block mr-3 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                안되는
              </span>
              <span className="text-white/60">시간 빼고</span>
              <br />
              <span className="text-white/60">널널한 시간 찾기</span>
            </h1>
            <p className="text-lg xl:text-xl font-medium text-white/90 leading-relaxed max-w-lg">
              여러 사람의 일정을 한눈에 보고,
              <br />
              모두가 편한 시간을 쉽게 찾아보세요
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex items-center gap-10 mt-4">
            {[
              {
                icon: Calendar,
                title: "간단한 일정 조율",
                desc: "안되는 시간만 선택하면 끝",
              },
              {
                icon: Users,
                title: "여럿이 함께",
                desc: "친구, 동료와 간편하게",
              },
              {
                icon: MapPin,
                title: "중간 장소 추천",
                desc: "모두에게 딱 맞는 장소를",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                  <item.icon className="w-5 h-5 text-indigo-200" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-[15px] tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-white/30 text-[11px] font-medium leading-none">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code & Install Guide Section (Moved outside the top group to the bottom) */}
        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          {/* QR Code Card */}
          <div className="flex items-center gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 h-[148px]">
            <div className="shrink-0 rounded-2xl bg-white p-3 shadow-inner">
              <Image
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://nznz.app"
                alt="QR Code"
                width={96}
                height={96}
                className="h-24 w-24"
              />
            </div>
            <div className="flex flex-col gap-1 text-white">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/80">
                Quick Access
              </span>
              <p className="text-[14.5px] font-bold leading-relaxed tracking-tight text-white/90 whitespace-nowrap">
                지금 바로 휴대폰으로
                <br />
                <span className="text-indigo-200 underline decoration-indigo-200/30 underline-offset-4">
                  널널하게
                </span>{" "}
                접속해보세요
              </p>
            </div>
          </div>

          {/* Install Guide Card (Styled like QR Card) */}
          <div className="flex items-center rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 h-[148px]">
            <div className="flex flex-col gap-5">
              {/* iOS Guide */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                  <Share className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300/80">
                    iPhone (Safari)
                  </span>
                  <p className="text-[14px] font-bold text-white tracking-tight">
                    공유 <span className="mx-1 text-white/30">→</span> 홈 화면에
                    추가
                  </p>
                </div>
              </div>

              {/* Android Guide */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-200 border border-teal-500/20">
                  <MoreVertical className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-300/80">
                    Android (Chrome)
                  </span>
                  <p className="text-[14px] font-bold text-white tracking-tight">
                    메뉴 <span className="mx-1 text-white/30">→</span> 앱 설치
                    또는 홈 추가
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Frame Container */}
      <div className="relative wrap-container flex flex-col bg-white shadow-[0_0_50px_rgba(0,0,0,0.15)] lg:my-auto lg:h-[844px] lg:max-h-[90dvh] lg:rounded-[40px] lg:border-[8px] lg:border-gray-900 overflow-hidden z-10">
        <AppHeader title={title} leftSlot={leftSlot} rightSlot={rightSlot} />

        <main className="flex flex-1 flex-col lg:overflow-y-auto lg:scrollbar-hide">
          <div className="main-container flex flex-1 flex-col">{children}</div>
        </main>

        {bottomSlot && (
          <FixedBottom
            className={cn(
              "min-h-[calc(var(--layout-bottom-stacked-fallback-height)+env(safe-area-inset-bottom))]",
              bottomReserveClassName,
            )}
            contentClassName={bottomContentClassName}
          >
            {bottomSlot}
          </FixedBottom>
        )}
      </div>
    </div>
  );
}
