export default {
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",     // 새로운 기능 추가
        "fix",      // 버그 수정
        "docs",     // 문서 변경
        "style",    // 스타일 변경
        "refactor", // 리팩토링 동작 동일 구조 개선
        "test",     // 테스트 코드 추가 수정 unit e2e 등
        "deploy",   // 배포 관련 작업
        "chore",    // 기타 작업
        "design",   // UI 디자인 변경
        "comment",  // 주석 추가 수정
        "rename",   // 파일 폴더 변수 이름 변경
        "remove",   // 파일 코드 기능 삭제
        "!HOTFIX",  // 긴급 수정
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-case": [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|docs|style|refactor|test|deploy|chore|design|comment|rename|remove|!HOTFIX) : (.+)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
};
