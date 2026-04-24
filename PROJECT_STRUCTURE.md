# Project Structure

이 문서는 `src` 하위 폴더의 역할과 파일 배치 기준을 공유하기 위한 문서입니다.

```txt
src/                                      # 애플리케이션 소스 루트
├── app/                                  # Next.js App Router 라우트 영역
│   ├── layout.tsx                        # 전체 앱을 감싸는 루트 레이아웃
│   ├── favicon.ico                       # Next.js가 인식하는 앱 파비콘
│   ├── (main)/                           # 주요 서비스 화면 라우트 그룹, URL에는 포함되지 않음
│   │   ├── layout.tsx                    # main 그룹 전용 레이아웃
│   │   ├── page.tsx                      # `/` 홈 화면
│   │   ├── new/page.tsx                  # `/new` 방 만들기 화면
│   │   ├── r/[slug]/                     # 참여자 플로우 라우트
│   │   │   └── page.tsx                  # `/r/:slug` 참여 진입 화면
│   │   └── host/                         # 방장/호스트 플로우 라우트
│   │       ├── my-rooms/page.tsx         # `/host/my-rooms` 내 방 목록 화면
│   │       └── [slug]/                   # `/host/:slug` 방장 상세 화면 라우트 폴더, page.tsx 추가 예정
│ 
├── components/                           # 여러 화면에서 재사용하는 UI 컴포넌트
│   ├── ui/                               # shadcn/radix 기반 원자 UI 컴포넌트
│   │   ├── button.tsx                    # 버튼 컴포넌트
│   │   ├── input.tsx                     # 입력 컴포넌트
│   │   └── ...                           # 기타 공통 UI 컴포넌트
│   ├── layout/                           # 앱 공통 레이아웃 컴포넌트
│   │   ├── AppShell.tsx                  # 헤더, 본문, 하단 액션을 조합하는 화면 셸
│   │   ├── AppHeader.tsx                 # 상단 고정 헤더
│   │   └── FixedBottom.tsx               # 하단 고정 액션 영역
│ 
├── features/                             # 기능 단위 모듈
│   ├── host/                             # 방장 기능 모듈, 구현 파일 추가 예정
│   ├── room/                             # 방 조회/상세 기능
│   │   ├── api/                          # room 전용 API
│   │   ├── components/                   # room 전용 컴포넌트
│   │   ├── hooks/                        # room 전용 훅
│   │   ├── styles/                       # room 전용 스타일
│   │   ├── types/                        # room 전용 타입
│   │   └── index.ts                      # room 기능 공개 진입점
│
├── shared/                               # 앱 전반에서 공유하는 비즈니스 공통 코드
│   ├── api/                              # 공통 API 클라이언트, query client
│   ├── constants/                        # 라우트, 환경변수, 상수
│   │   └── routes.ts                     # 앱 라우트 상수
│   ├── hooks/                            # 공통 React hooks
│   │   └── useElementSize.ts             # FixedBottom 높이 보정에 사용
│   ├── lib/                              # 앱 전반에서 공유하는 순수 유틸
│   ├── store/                            # 전역 상태 저장소
│   └── types/                            # 공통 타입
│       └── common.ts                     # 앱 공통 타입
│
├── lib/                                  # shadcn/ui 호환용 기술 유틸
│   └── utils.ts                          # cn 유틸, shadcn 컴포넌트가 참조
│
├── styles/                               # 전역 스타일 관리
│   ├── globals.css                       # Tailwind import, 전역 변수, 공통 레이아웃 클래스
│   ├── font.css                          # 로컬 폰트 @font-face 정의
│   └── icons.css                         # 아이콘 CSS 변수와 아이콘 클래스
│
├── assets/                               # 정적 자산 원본
│   ├── fonts/                            # 로컬 폰트 파일
│   │   └── pretendard/                   # Pretendard 폰트 파일
│   └── images/                           # 이미지
```

## 배치 기준

- 라우트와 URL 구조는 `src/app`에서 관리합니다.
- 화면별 비즈니스 로직은 `src/features/{feature}`에 둡니다.
- 여러 기능에서 함께 쓰는 코드는 `src/shared`에 둡니다.
- 여러 화면에서 재사용하는 UI는 `src/components`에 둡니다.
- shadcn/ui가 기대하는 `cn` 유틸은 `src/lib/utils.ts`에 둡니다.
- 전역 CSS 변수, 공통 레이아웃 클래스, Tailwind import는 `src/styles/globals.css`에서 관리합니다.
- 폰트, 이미지, 아이콘 같은 원본 자산은 `src/assets`에 둡니다.
