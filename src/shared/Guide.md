# 📂 shared 폴더 가이드

`src/shared` 폴더는 특정 기능(Feature)에 종속되지 않고, **애플리케이션 전반에서 공통적으로 재사용되는 비즈니스 로직과 데이터**를 관리합니다. `lib`이 기술적 도구라면, `shared`는 서비스의 운영 규칙과 흐름을 담습니다.

## 1. 폴더 내부 구성 및 역할

### ⚓ `/hooks`

여러 도메인에서 공통으로 사용할 수 있는 리액트 커스텀 훅을 관리합니다.

- **역할**: 상태 관리 로직 중복 제거, 브라우저 API(Resize, Scroll, Storage 등)의 선언적 사용.
- **예시**: `useElementSize.ts` (요소 크기 측정), `useLocalStorage.ts`, `useIntersectionObserver.ts` 등.

### 📏 `/constants`

서비스 전체에서 변하지 않는 고정된 값(상수)들을 관리합니다.

- **역할**: 하드코딩 방지, 값 변경 시 한 곳에서 일괄 수정 가능하도록 관리.
- **대상**:
  - API Base URL, 공통 에러 메시지
  - 정규표현식 (이메일, 비밀번호 패턴)
  - 디자인 수치 (Header 높이, Max Width 값)
  - 공통 옵션 리스트 (요일 목록, 카테고리 등)

### 🏷️ `/types`

프로젝트 전반에서 공유되는 공통 인터페이스와 타입을 정의합니다.

- **역할**: 데이터 구조의 일관성 보장 및 타입 안정성 확보.
- **대상**:
  - **API 공통 규격**: `ApiResponse<T>`, `Pagination<T>`
  - **공통 도메인**: `User`, `CommonStatus`
  - **유틸리티 타입**: `Nullable<T>`, `ValueOf<T>`

---

## 2. 활용 및 등록 규칙 (필수)

### ✅ Hooks 적용 (예: useElementSize)

컴포넌트의 크기를 동적으로 계산해야 하는 여러 기능에서 임포트하여 사용합니다.

```ts
// src/shared/hooks/useElementSize.ts
import { useElementSize } from "@/shared/hooks/useElementSize";

const [ref, { width }] = useElementSize();
```

### ✅ Constants 정의 및 호출

의미 있는 이름을 부여하여 관리합니다.

```ts
// src/shared/constants/layout.ts
export const HEADER_HEIGHT = 56;

// 사용 시
<div style={{ marginTop: HEADER_HEIGHT }} />;
```

### ✅ Types 관리

도메인별 feature 폴더에 넣기 모호한 공통 데이터 구조를 정의합니다.

```ts
// src/shared/types/common.ts
export interface User {
  id: string;
  name: string;
  role: "HOST" | "MEMBER";
}
```

## 3. 폴더 관리 원칙

1. **무색무취(Stateless)**: 특정 도메인(방 생성, 장소 추천 등)의 구체적인 비즈니스 로직을 담지 않습니다. (그런 로직은 `features` 폴더로 이동)

2. **범용성**: 최소 2개 이상의 서로 다른 도메인에서 쓰일 가능성이 있는 코드만 이 폴더에 위치시킵니다.

3. **참조 제한**: shared 폴더 내부의 코드는 features나 app 폴더의 코드를 참조해서는 안 됩니다. (의존성 단방향 유지)
