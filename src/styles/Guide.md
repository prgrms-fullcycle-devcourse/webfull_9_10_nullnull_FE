# 🛠 styles 폴더 가이드

`src/styles` 폴더는 프로젝트 전반에 적용되는 **시각적 요소(아이콘, 폰트)**와 **전역 스타일 규칙**을 정의하고 관리하는 공간입니다. 모든 정적 자산은 반드시 이 폴더의 설정 파일에 등록된 후 사용되어야 합니다.

## 1. 폴더 내부 구성

- **`icon.css`**: `public/assets/icon`에 저장된 SVG 아이콘들을 CSS 클래스로 매핑하여 관리합니다.
- **`font.css`**: 서비스에서 사용하는 로컬 폰트(Pretendard 등)의 `@font-face`를 정의하고 관련 변수를 설정합니다.
- **(참조) `globals.css`**: `src/app/`에 위치하며, `styles` 폴더 내의 `icon.css`, `font.css` 등을 `@import`로 통합하여 관리하는 메인 컨트롤 타워입니다.

## 2. 아이콘 시스템 (CSS Mask 기반)

우리 프로젝트는 SVG 코드를 직접 사용하지 않고 CSS 클래스명을 통해 아이콘을 렌더링합니다. 이 방식은 부모 요소의 `text-color`를 통해 아이콘 색상을 자유롭게 변경할 수 있게 해줍니다.

### 💡 등록 및 사용 규칙 (필수)

새로운 아이콘이 추가되면 반드시 `icon.css`에 클래스를 등록해야 합니다.

1. **등록**: `src/styles/icon.css`

```css
.icon-arrow-left {
  mask-image: url("/assets/icon/arrow_left.svg");
  -webkit-mask-image: url("/assets/icon/arrow_left.svg");
}
```

2. 사용: 별도의 import 없이 등록된 클래스명만 사용

```ts
<span className="icon-arrow-left w-6 h-6 text-primary" />
```

## 3. 폰트 시스템 관리

모든 로컬 폰트는 `src/styles/font.css`에 등록하여 관리합니다.

💡 등록 및 사용 규칙 (필수)

1. 등록: `src/styles/font.css`에 `@font-face`를 정의합니다.

2. 연결: `globals.css`에서 해당 폰트 패밀리를 CSS 변수나 Tailwind 테마에 연결합니다.

3. 사용: 설정된 폰트 변수나 Tailwind 클래스(예: `font-sans`)를 통해 적용합니다.

## 4. 스타일 수정 및 확장 가이드

새로운 전역 스타일이 필요할 경우, 목적에 맞는 CSS 파일을 `src/styles`에 생성한 후 `src/app/globals.css`에서 `@import` 하여 통합합니다.

모든 `@import` 경로는 `src/app/globals.css`를 기준으로 상대 경로(`../styles/...`)를 사용합니다.
