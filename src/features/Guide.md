# 🚀 features 폴더 전체 가이드

`src/features` 폴더는 서비스의 주요 기능들을 독립적인 도메인으로 나누어 관리합니다. 각 도메인은 자기 완결적인 구조를 가지며, 다른 기능과의 의존성을 최소화하는 것을 원칙으로 합니다.

## 1. 전체 구조 (Directory Structure)

모든 feature 도메인은 아래와 같은 표준화된 하위 구조를 가집니다.

```text
src/features/{domain-name}/
├── api/          # 해당 기능에서 사용하는 서버 통신 로직 (Axios/Fetch 등)
├── components/   # 해당 기능에서만 사용되는 전역/복잡 컴포넌트
├── hooks/        # 해당 기능의 비즈니스 로직을 담은 커스텀 훅
├── stores/       # 해당 기능의 상태 관리 (Zustand 등)
├── types/        # 해당 도메인 전용 인터페이스 및 타입 정의
├── utils/        # 해당 도메인 내에서만 쓰이는 헬퍼 함수
```

2. 도메인 분류 예시
   우리 프로젝트의 PRD를 기반으로 다음과 같이 나눌 수 있습니다.

- `/auth`: 로그인, 회원가입, 세션 관리

- `/room`: 약속 방 생성, 방 설정 수정, 방 정보 조회

- `/time-slot`: 가용 시간 입력, 시간 추천 알고리즘 로직

- `/location`: 중간 지점 찾기, 장소 검색, 카카오맵 연동

- `/host`: 방장의 권한 행위 (방 확정, 알림 보내기 등)

## 3. 개발 원칙 및 규칙 (Ground Rules)

✅ 1. 캡슐화 (Encapsulation)

- 특정 기능에 필요한 코드는 최대한 해당 도메인 폴더 안에서 해결합니다.

- 예: room에만 쓰이는 버튼이나 유틸리티 함수를 공통 폴더(src/components 등)에 넣지 마세요.

✅ 2. 의존성 관리 (Dependency)

- **Feature 간 직접 참조 최소화**: `/features/room`의 컴포넌트가 `/features/location`의 내부 함수를 깊게 참조하지 않도록 합니다.

- 만약 두 기능이 공통으로 사용하는 로직이 있다면 `src/shared`로 추출합니다.

✅ 3. 명확한 진입점 (Public API)

- 각 도메인 폴더의 하위 폴더(`api`, `hooks` 등)에 `도메인명.ts`를 두어 외부에서 가져다 쓰기 편하게 관리하는 것을 권장합니다.

- 예: ` import { useAuth } from "@/features/auth/hooks";`

✅ 4. 데이터 흐름

- **api**: 서버 데이터 fetching

- **stores**: 클라이언트 상태 유지

- **hooks**: api와 stores를 조합하여 UI 컴포넌트가 바로 쓸 수 있는 형태로 가공

## 4. 새로운 Feature 추가 시 체크리스트

1. `/src/features/` 아래에 적절한 도메인 명으로 폴더를 생성했는가?

2. `api`, `components`, `hooks`, `types` 등 기본 구조를 갖추었는가?

3. 해당 도메인의 핵심 로직이 `shared`나 `lib`에 잘못 들어가 있지는 않은가?

## 5. 실행 가이드

모든 기능은 `/src/features/` 폴더 안에 도메인별로 독립적인 폴더를 만들어 구현합니다.
