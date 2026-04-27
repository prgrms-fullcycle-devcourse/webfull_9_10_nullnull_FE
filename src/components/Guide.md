# 🧩 components 폴더 가이드

`src/components` 폴더는 프로젝트 전반에서 재사용되는 **공통 UI 컴포넌트**와 서비스의 뼈대를 이루는 **레이아웃 컴포넌트**를 관리하는 공간입니다. 모든 컴포넌트는 원자 단위로 쪼개져 있으며, 특정 도메인 로직에 종속되지 않는 것을 원칙으로 합니다.

## 1. 폴더 내부 구성

- **`/ui`**: shadcn/ui 기반의 원자(Atomic) 단위 컴포넌트들입니다. (Button, Input, Dialog, Drawer 등) 기본적인 스타일과 접근성이 이미 구현되어 있습니다.
- **`/layout`**: 서비스의 전체적인 구조를 잡는 컴포넌트들입니다.
  - `AppShell.tsx`: 서비스의 메인 컨테이너 구조를 정의합니다.
  - `AppHeader.tsx`: 상단 내비게이션 바 및 헤더 영역입니다.
  - `FixedBottom.tsx`: 하단에 고정되어야 하는 버튼이나 액션 바를 배치할 때 사용합니다.

## 2. 공통 UI 컴포넌트 사용법

`/ui` 폴더의 컴포넌트들은 Tailwind CSS와 `lucide-react` 아이콘 등을 활용하여 디자인 시스템에 맞춰져 있습니다.

### ✅ 기본 적용 방법

필요한 컴포넌트를 직접 호출하여 사용합니다. `cn()` 유틸리티를 통해 외부에서 스타일을 쉽게 덮어쓸 수 있습니다.

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExamplePage() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="이름을 입력하세요" />
      <Button variant="primary" size="lg">
        확인
      </Button>
    </div>
  );
}
```

## 3. 레이아웃 시스템 적용 (AppRouter)

서비스의 일관된 레이아웃을 위해 AppShell과 헤더, 바텀 시트 등을 조합하여 사용합니다.

✅ Layout 적용 예시 (src/app/layout.tsx)
전체 페이지의 뼈대를 구성할 때 사용합니다.

```tsx
import { AppShell } from "@/components/layout/AppShell";
import { AppHeader } from "@/components/layout/AppHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AppShell>
          <AppHeader title="방 만들기" showBackButton />
          <main>{children}</main>
          {/* 필요한 경우 FixedBottom 배치 */}
        </AppShell>
      </body>
    </html>
  );
}
```

## 4. 4. 컴포넌트 추가 및 수정 규칙

1. **도메인 독립성**: 여기에 작성되는 컴포넌트는 특정 기능(예: `Room`, `User`)의 데이터를 직접 참조하지 않아야 합니다. 데이터는 오직 `props`로만 전달받습니다.

2. **shadcn/ui 확장**: 새로운 공통 UI가 필요하면 `npx shadcn-ui@latest add [component]` 명령어로 추가하거나, 기존 UI를 조합하여 작성합니다.

3. **배치 원칙**: 특정 페이지에서만 쓰이는 복잡한 컴포넌트는 여기서 관리하지 않고 `src/features/{domain}/components` 폴더에서 관리합니다.
