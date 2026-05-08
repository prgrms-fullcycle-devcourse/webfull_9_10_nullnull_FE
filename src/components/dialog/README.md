# Dialog 사용 규칙

프로젝트에서 alert, confirm, bottom sheet 계열 팝업은 `AppDialog`를 기준으로 사용합니다.
`src/components/ui/alert-dialog.tsx`, `sheet.tsx`, `drawer.tsx`는 shadcn/Radix 래퍼이므로 페이지에서 직접 조합하기보다 `AppDialog`를 우선 사용합니다.

## 기본 원칙

- 페이지에서는 `AppDialog`를 사용합니다.
- 트리거 버튼은 `AppDialog`의 `children`으로 전달합니다.
- `title`, `description`, `actions`로 dialog 내용을 구성합니다.
- dim과 dialog는 공통으로 `.wrap-container` 기준에 렌더링됩니다.
  - `AppDialog`는 내부적으로 `AlertDialogContent`, `SheetContent`, `DrawerContent`를 사용합니다.
  - 이 ui 래퍼들이 `getDialogContainer()`를 통해 `.wrap-container` 기준으로 portal을 렌더링합니다.
  (AppDialog는 내부적으로 AlertDialogContent, SheetContent, DrawerContent를 사용하며, 이 ui 래퍼들이 getDialogContainer()를 통해 .wrap-container 기준으로 portal을 렌더링합니다.)
- `alert-dialog`, `sheet`, `drawer`의 `Overlay` 이름은 dim 역할이므로 그대로 사용합니다.
- 페이지 전용 문구, API 호출, 라우팅 처리는 페이지 또는 feature 영역에서 관리합니다.

## 사용 예시

```tsx
<AppDialog
  type="confirm"
  title="모집을 마감할까요?"
  description="모집을 마감하면 더 이상 답변을 받을 수 없어요"
  actions={[
    { label: "취소", variant: "secondary" },
    { label: "마감하기", onClick: handleCloseRecruit },
  ]}
>
  <Button size="cta">모집 마감하기</Button>
</AppDialog>
```

`children`은 내부에서 Radix의 `Trigger asChild`로 연결됩니다. 접근성을 위해 별도의 외부 `onClick`으로 dialog를 여는 방식보다 이 방식을 우선 사용합니다.

## type

현재 구현된 타입만 사용합니다.

```ts
type DialogType = "alert" | "confirm" | "bottom";
```

| type | 용도 |
| --- | --- |
| `alert` | 확인 버튼 중심의 단순 안내 |
| `confirm` | 취소/확인처럼 사용자 결정을 받는 팝업 |
| `bottom` | 하단에서 올라오는 sheet/drawer 형태 |

`dialog`, `full` 같은 타입은 실제 레이아웃이 구현된 뒤 추가합니다. 타입만 먼저 열어두지 않습니다.

## dialogSize

화면마다 dialog 크기가 다를 수 있으므로 `dialogSize`로 구분합니다.

```tsx
<AppDialog dialogSize="compact" />
```

| size | 용도 |
| --- | --- |
| `default` | 모집 마감 등 일반 confirm |
| `compact` | 설정 로그아웃, 회원탈퇴 dialog |

`compact`는 Production Figma 기준으로 다음 규칙을 따릅니다.

- alert padding: `p-4` = 16px
- 버튼 높이: `h-14` = 56px
- 버튼 간격: `gap-3` = 12px
- title: `text-xl font-semibold` = 20px semibold
- description: `text-base font-medium` = 16px medium

`dialogSize`는 alert/confirm뿐 아니라 `type="bottom"`의 action 버튼에도 전달됩니다.
따라서 bottom 타입에서도 같은 버튼 크기 규칙을 사용할 수 있습니다.

## actions

버튼은 `actions` 배열로 정의합니다.

```tsx
actions={[
  { label: "취소", variant: "secondary" },
  { label: "로그아웃", onClick: logout },
]}
```

### action 속성

| 속성 | 설명 |
| --- | --- |
| `label` | 버튼 텍스트 |
| `variant` | `primary`, `secondary`, `danger`, `ghost` |
| `onClick` | 버튼 클릭 시 실행할 함수 |
| `disabled` | 버튼 비활성화 |
| `closeOnClick` | `false`면 클릭 후 dialog를 닫지 않음 |

`onClick`은 비동기 함수도 허용합니다.

```tsx
actions={[
  {
    label: "마감하기",
    onClick: async () => {
      await closeRecruitment();
    },
  },
]}
```

기본 동작은 `onClick` 완료 후 dialog를 닫는 것입니다. API 실패 시 닫히지 않게 하려면 `onClick` 내부에서 에러를 처리하거나 `closeOnClick: false`를 사용합니다.

액션 버튼은 배열 순서대로 렌더링됩니다. 취소 버튼이 필요한 경우 첫 번째 action으로 둡니다.
취소 버튼도 별도 처리 없이 기본적으로 클릭 후 dialog가 닫힙니다.

## open과 defaultOpen

`open`은 controlled prop입니다.

```tsx
const [open, setOpen] = useState(false);

<AppDialog open={open} onOpenChange={setOpen} />
```

처음 렌더링 시 열어두고 내부에서 닫히게 하려면 `defaultOpen`을 사용합니다.

```tsx
<AppDialog defaultOpen />
```

`open`만 단독으로 넘기는 방식은 사용하지 않습니다.

```tsx
// 사용하지 않음
<AppDialog open />
```

## bottom 타입

`type="bottom"`은 하단 팝업입니다.

```tsx
<AppDialog
  type="bottom"
  engine="sheet"
  title="약관에 동의해주세요"
  actions={[{ label: "확인" }]}
>
  <Button>열기</Button>
</AppDialog>
```

`engine`은 기본값이 `sheet`입니다.

| engine | 기준 |
| --- | --- |
| `sheet` | 일반적인 하단 sheet |
| `drawer` | drag 동작 등 drawer 성격이 필요할 때 |

디자인상 둘 다 bottom sheet처럼 보여도 기능 차이가 있으므로 `engine`으로 구분합니다.

`engine`은 `type="bottom"`일 때만 의미가 있습니다.
`alert`, `confirm`에서는 `engine`을 지정하지 않습니다.

## 하지 말아야 할 것

- 페이지에서 shadcn `AlertDialogContent`, `AlertDialogFooter`를 직접 조합하지 않습니다.
- dialog를 열기 위해 별도 id manager를 만들지 않습니다.
- `open`만 단독으로 넘겨 테스트하지 않습니다. 테스트용 초기 열림은 `defaultOpen`을 사용합니다.
- 페이지 전용 props constants를 shared/common 영역에 두지 않습니다.
- 아직 구현되지 않은 dialog 타입을 미리 열어두지 않습니다.

## 파일 책임

| 파일 | 책임 |
| --- | --- |
| `AppDialog.tsx` | dialog/sheet/drawer 선택과 공통 레이아웃 |
| `DialogActions.tsx` | actions 배열을 버튼 UI로 렌더링 |
| `types.ts` | dialog public 타입 |
| `useDialogOpen.ts` | controlled/uncontrolled open 상태 처리 |
| `src/components/ui/*` | shadcn/Radix 기반 원자 컴포넌트 |
| `src/lib/getDialogContainer.ts` | `.wrap-container` 기준 portal container 조회 |
