"use client";

import Image from "next/image";
import pcBg from "@/assets/images/pc.png";
import { Share, MoreVertical, Calendar, Users, MapPin } from "lucide-react";

export function PCLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Wrap min-h-dvh lg:h-dvh lg:overflow-hidden overflow-x-hidden bg-background">
      {/* PC Background Image (Persistent) */}
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(101, 70, 255, 0.78) 0%, rgba(101, 70, 255, 0) 76%)",
          }}
        />
        <div className="absolute inset-0 bg-black/5 backdrop-brightness-[0.98]" />
      </div>

      {/* Background Blobs (Persistent) */}
      <div className="blob-container hidden lg:block opacity-60">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="blob blob-5" />
      </div>

      {/* PC Branding Section (Persistent) */}
      <aside className="pc-branding relative hidden lg:flex flex-1 flex-col justify-between overflow-hidden h-full z-10 py-16 px-10 xl:px-24">
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-(--color-primary-default) rounded-[22px] flex items-center justify-center shadow-2xl shadow-black/30 border-2 border-white/20">
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

          <div className="flex flex-col gap-6">
            <h1 className="text-[52px] xl:text-[60px] font-black leading-[1.15] tracking-[-0.04em] text-white">
              <span className="inline-block mr-3 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                안되는
              </span>
              <span className="text-white">시간 빼고</span>
              <br />
              <span className="text-white">널널한 시간 찾기</span>
            </h1>
            <p className="text-lg xl:text-xl font-medium text-white/90 leading-relaxed max-w-lg">
              여러 사람의 일정을 한눈에 보고,
              <br />
              모두가 편한 시간을 쉽게 찾아보세요
            </p>
          </div>

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
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-[15px] tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-white/90 text-[11px] font-medium leading-none">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
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

          <div className="flex items-center rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 h-[148px]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                  <Share className="w-5 h-5" />
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300/80">
                    iPhone (Safari)
                  </span>
                  <p className="text-[14px] font-bold text-white tracking-tight">
                    공유 <span className="mx-1 text-white/30">→</span> 홈 화면에
                    추가
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-200 border border-teal-500/20">
                  <MoreVertical className="w-5 h-5" />
                </div>
                <div className="flex flex-col whitespace-nowrap">
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

      {/* Actual Mobile Content Area */}
      <div
        id="app-container"
        className="relative wrap-container flex flex-col bg-white shadow-[0_0_50px_rgba(0,0,0,0.15)] lg:my-auto lg:h-[844px] lg:max-h-[90dvh] lg:rounded-[40px] lg:border-8 lg:border-gray-900 overflow-hidden z-10"
      >
        {children}
      </div>
    </div>
  );
}
