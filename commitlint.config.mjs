export default {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'deploy',
        'chore',
        'design',
        'comment',
        'rename',
        'remove',
        '!HOTFIX',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|docs|style|refactor|test|deploy|chore|design|comment|rename|remove|!HOTFIX) : (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
};
