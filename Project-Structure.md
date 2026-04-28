# 📂 Project Structure Guide

이 문서는 프로젝트의 전체적인 폴더 구조와 각 폴더의 역할을 설명합니다. 모든 팀원은 새로운 코드를 작성할 때 아래 구조를 준수해야 합니다.

## 🏗 전체 디렉토리 구조

```text
src/
├── app/              # Next.js App Router (Routing, Layout, Page Composition)
├── assets/           # 폰트, 이미지 등 정적 자원 (관리용 원본)
├── components/       # 공통 UI 컴포넌트 및 레이아웃
│   ├── layout/       # AppShell, Header, FixedBottom 등 뼈대 컴포넌트
│   └── ui/           # shadcn/ui 기반 원자 단위 컴포넌트 (Button, Input 등)
├── features/         # 도메인별 비즈니스 로직 (Auth, Room, TimeSlot 등)
├── lib/              # 기술적 공통 유틸리티 및 라이브러리 설정 (utils, socket 등)
├── shared/           # 전역 비즈니스 공유 자원 (Hooks, Constants, Types)
└── styles/           # 전역 CSS 설정 (font.css, icon.css 등)
```

## 📁 주요 폴더별 상세 설명

1. `src/app`

- **역할**: 서비스의 경로(URL)를 정의하고 페이지를 조립합니다.

- **핵심 파일**:
  - `layout.tsx`: 전역 레이아웃 및 프로바이더 설정.
  - `globals.css`: 전역 스타일 및 Tailwind 테마 정의.
  - `icon.svg`: 브라우저 탭에 표시되는 파비콘.
  - `[slug]/`: 다이나믹 라우팅을 통한 동적 페이지 관리.

2. `src/features`

- **역할**: 기능(도메인) 단위로 코드를 캡슐화합니다.

- **구조**: 각 도메인 폴더 내에 `api`, `components`, `hooks`, `stores`, `types`를 포함하여 자기 완결적인 구조를 가집니다.

- **원칙**: 도메인 간의 의존성을 최소화하고 재사용 가능한 로직은 `shared`로 보냅니다.

3. `src/components`

- **layout/**: 서비스의 일관된 틀(`AppShell`, `AppHeader`, `FixedBottom`)을 제공합니다.

- **ui/**: 특정 비즈니스 로직이 없는 순수 UI 컴포넌트들입니다.

4. `src/shared`

- **hooks/**: `useElementSize`와 같이 여러 기능에서 공통으로 쓰는 상태 로직.

- **constants/**: 에러 메시지, 정규표현식, 디자인 수치 등 공통 상수.

- **types/**: API 공통 규격이나 전역 도메인 인터페이스.

5. `src/lib`

- **utils.ts**: `cn()`과 같은 기술적 헬퍼 함수.

- **socket.ts**: Socket.io 인스턴스 초기화 및 공통 설정.

6. `src/assets`

- **역할**: 아이콘이나 폰트 자산을 관리합니다.

- **프로세스**: `src/assets`에 원본을 보관합니다.

7. `src/styles`

- **역할**: 프로젝트 전반에 적용되는 시각적 요소(폰트, 아이콘)와 전역 스타일 규칙을 정의합니다.

- **핵심 파일**:
  - `font.css`: `src/assets/fonts`의 자산을 불러와 `@font-face`를 정의합니다.
  - `icon.css`: `public/assets/icon`의 SVG를 CSS Mask 클래스로 매핑하여 관리합니다.

- **특징**: 모든 정적 자산은 직접 컴포넌트에서 호출하기보다, 가급적 이 폴더의 CSS 설정을 거쳐 클래스 형태로 사용합니다.

## 🛠 관리 원칙

- **단방향 의존성**: `features`는 `shared`, `lib`, `components/ui`를 참조할 수 있지만, 반대의 경우는 금지합니다.

- **페이지 최소화**: `app/page.tsx`는 컴포넌트 조립에만 집중하고 복잡한 로직은 `features` 훅으로 분리합니다.

- **가이드 준수**: 새로운 폴더나 큰 기능을 추가할 때는 해당 폴더 내에 `Guide.md`를 작성하여 팀원들과 공유합니다.
