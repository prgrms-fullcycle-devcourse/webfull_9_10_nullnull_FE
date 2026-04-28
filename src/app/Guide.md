# 🌐 app 폴더 가이드 (Routing & Composition)

`src/app` 폴더는 서비스의 **URL 경로(Route)**를 정의하고, `features` 폴더의 도메인 단위 컴포넌트들을 조합하여 하나의 완성된 페이지를 만드는 역할을 합니다.

## 1. 다이나믹 라우팅 및 슬러그(Slug) 활용

방 상세 페이지나 시간 입력 페이지처럼 URL에 변수(`[slug]`)가 포함되는 경우, 해당 폴더 명을 `[slug]` 또는 `[id]` 형식으로 생성합니다.

- **경로 예시**: `src/app/room/[slug]/page.tsx`
- **역할**: URL에서 추출한 `slug`를 `features`의 API 함수나 Hook에 전달하여 특정 방의 정보를 불러옵니다.

### ✅ 활용 예시 (페이지 컴포넌트)

```tsx
// src/app/room/[slug]/page.tsx
import { AppHeader } from "@/components/layout/AppHeader";
import { AppShell } from "@/components/layout/AppShell";
import { TimeSlotContainer } from "@/features/time-slot/components/TimeSlotContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params; // URL에서 slug 추출

  return (
    <AppShell>
      <AppHeader title="일정 조율" showBackButton />
      <main className="p-4">
        {/* feature 컴포넌트에 slug를 주입하여 도메인 로직 실행 */}
        <TimeSlotContainer roomSlug={slug} />
      </main>
    </AppShell>
  );
}
```

## 2. Feature 컴포넌트 조합 (Composition)

`app` 폴더 내의 페이지는 비즈니스 로직을 직접 구현하지 않습니다. 대신 `features`에 만들어둔 부품들을 조립하는 역할만 수행합니다.

- Layout: `AppShell`, `AppHeader`, `FixedBottom`으로 전체 틀을 잡습니다.

- Features: 각 도메인에서 `export`된 Container나 Form 컴포넌트를 배치합니다.

- Shared: 전역적으로 쓰이는 UI(Button, Input 등)나 훅을 보조적으로 사용합니다.

## 3. 폴더 구조 설계 가이드

```
src/app/
├── layout.tsx              # 전역 레이아웃 (Font, Provider, Global CSS)
├── globals.css             # 전역 스타일 및 테마 정의
├── page.tsx                # 랜딩 페이지 (메인)
├── (main)/                 # (선택) 그룹화 폴더 - 헤더/푸터가 공유되는 페이지들
│   ├── create/             # 방 생성 페이지
│   └── rooms/              # 내 참여 목록 페이지
└── room/[slug]/            # 다이나믹 라우트 (방 상세 도메인)
    ├── page.tsx            # 방 상세 메인
    ├── entry/              # 참여 전 닉네임 입력 페이지
    └── result/             # 최종 결과 페이지
```

## 4. 개발 원칙

- 데이터 페칭: 가능한 서버 컴포넌트(`page.tsx`)에서 `slug`를 받아 데이터를 불러오거나, 클라이언트 컴포넌트로 `slug`를 넘겨주어 `useQuery` 등으로 처리하게 합니다.

- 간결함 유지: 페이지 파일(`page.tsx`)에 복잡한 스타일이나 로직을 직접 작성하지 마세요. 코드가 길어진다면 해당 로직이 `features` 폴더에 있어야 하는 건 아닌지 확인합니다.

- SEO 및 메타데이터: `generateMetadata` 함수를 활용하여 `slug` 기반의 동적 페이지 제목(예: "모임 이름 - 일정 조율")을 설정합니다.

## ## 5. globals.css (전역 스타일 및 테마 정의)

`src/app/globals.css`는 프로젝트의 모든 스타일 설정이 모이는 최종 컨트롤 타워입니다.

- **역할**:
  - `styles` 폴더의 자산(font, icon)을 `@import`로 통합합니다.
  - Tailwind CSS의 기본 레이어(@theme)를 확장하여 프로젝트 전용 컬러, 애니메이션, 폰트 변수를 정의합니다.
- **관리 규칙**:
  - 반드시 상대 경로(`@import "../styles/font.css";`)를 사용하여 외부 CSS를 불러옵니다.
  - 서비스 전체에서 반복되는 CSS 변수(예: `--primary-color`, `--radius`)는 이곳의 `@theme` 블록 내에서 관리합니다.

### ✅ 작성 예시

```css
@import "tailwindcss";
@import "../styles/font.css";
@import "../styles/icon.css";

@theme {
  --font-sans: "Pretendard", sans-serif;
  --color-primary: #ff5a5f;
  /* 프로젝트 전용 테마 변수들을 여기서 확장 */
}
```
