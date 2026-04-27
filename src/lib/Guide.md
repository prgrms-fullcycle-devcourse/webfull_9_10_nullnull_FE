# 🛠 lib 폴더 가이드

`src/lib` 폴더는 특정 비즈니스 로직에 종속되지 않고, **프로젝트 전반에서 공통으로 사용되는 기술적 유틸리티 및 라이브러리 설정**을 관리하는 공간입니다.

## 1. 폴더의 역할

- **기술적 공통 함수**: 프로젝트 어디서든 호출할 수 있는 순수 함수나 기술적인 도구들을 모아둡니다.
- **외부 라이브러리 초기화**: 외부 라이브러리(예: Axios, Prisma, Firebase 등)를 프로젝트 환경에 맞춰 인스턴스화하거나 초기 설정을 진행합니다.
- **재사용성**: 특정 기능(Feature)에 묶이지 않은 유틸리티를 한데 모아 코드 중복을 방지합니다.

## 2. 주요 포함 파일

### `utils.ts`

프로젝트의 전역 유틸리티 함수들이 정의됩니다. 현재 다음과 같은 핵심 기능이 포함되어 있습니다.

- **`cn(...inputs: ClassValue[])`**:
  - `clsx`와 `tailwind-merge`를 결합한 함수입니다.
  - Tailwind 클래스를 조건부로 결합하거나, 클래스 간 충돌을 방지하면서 동적으로 스타일을 적용할 때 필수적으로 사용합니다.

## 3. 사용 예시

컴포넌트나 기능 구현 시 다음과 같이 `lib`의 도구들을 활용합니다.

```tsx
import { cn } from "@/lib/utils";

export function CustomButton({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition-colors", // 기본 스타일
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200", // 조건부 스타일
        className, // 외부에서 주입받은 커스텀 스타일 (병합됨)
      )}
    >
      클릭
    </button>
  );
}
```

## 4. 폴더 관리 규칙

1. **순수성 유지**: 비즈니스 로직(예: 유저 정보 처리, 방 생성 로직 등)은 `shared`나 `features` 폴더에서 관리하고, `lib`에는 오직 **기술적인 보조 도구**만 둡니다.
2. **최소 의존성**: 가급적 다른 폴더(`app`, `features` 등)를 참조하지 않도록 설계하여 **어디서든 쉽게 임포트**할 수 있게 유지합니다.
3. **확장성**: 추후 API 클라이언트 설정(`axios.ts`)이나 외부 SDK 설정 파일이 추가될 때 이 폴더 내에 **별도의 파일로 분리하여 관리**합니다.

## 5. 추가적으로 들어갈 만한 것들

- 외부 라이브러리 설정 파일 ex) axios.ts, prisma.ts
- 외부 SDK 설정 파일 ex) firebase.ts, supabase.ts
- 외부 SDK 클라이언트
