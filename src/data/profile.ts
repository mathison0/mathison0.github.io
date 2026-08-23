import type { SkillGroup, TimelineItem } from '../types'

export const profile = {
  name: 'Seyoung Park',
  nameKo: '박세영',
  role: 'Game Client Developer',
  headline: '플레이가 손에 붙는 감각을, 재현 가능한 구조로 만듭니다.',
  intro:
    'C++와 Unreal Engine 5로 게임 클라이언트를 만듭니다. 크래프톤 정글 게임테크랩에서 14주간 ' +
    '자체 게임 엔진을 만들었고, 그 경험을 바탕으로 UE5 플러그인 DynamicRope를 개발해 Fab에 출시했습니다.',
  location: 'Seoul, KR',
  email: 'seyoungpark@hanyang.ac.kr',
  githubUrl: 'https://github.com/mathison0',
  resumeUrl: '', // 이력서 PDF를 public/ 에 두고 '/resume.pdf' 처럼 지정
  /**
   * 홈 첫 화면의 커버 레터(요약) — 4~5줄로 자신을 요약.
   * links를 주면 해당 줄 끝에 링크가 붙는다 (내부 경로 '/projects/...' 또는 외부 URL).
   */
  highlights: [
    {
      text: 'Unreal Engine 5 플러그인 DynamicRope 출시 — GPU XPBD 로프 시뮬레이션 · 본 래핑',
      links: [
        {
          label: 'Fab',
          href: 'https://www.fab.com/listings/17f62a8f-387b-48b0-9198-af7273dc3733',
        },
      ],
    },
    {
      text: '크래프톤 정글 게임테크랩 3기 — C++ / DirectX 11 자체 게임 엔진 14주 제작',
      links: [{ label: '자세히', href: '/projects/gametechlab-engine' }],
    },
    {
      text: '카이스트 몰입캠프 수료 — 4주간 4개 프로젝트 완성 (Godot · Phaser 멀티플레이 게임 등)',
      links: [
        { label: 'FLYFRY', href: '/projects/flyfry' },
        { label: 'RPG SLIME', href: '/projects/rpg-slime' },
      ],
    },
    {
      text: 'C++ 주력 · Perforce / Git / Slack 팀 협업',
    },
    {
      text: '한양대학교 컴퓨터소프트웨어학부 4학년 (휴학 중)',
    },
  ],
  /** 홈 상단에 노출되는 요약 지표. */
  facts: [
    { label: '주 사용 엔진', value: 'Unreal 5' },
    { label: '주 사용 언어', value: 'C++' },
    { label: '관심 분야', value: '게임플레이' },
    { label: '상태', value: '한양대학교 컴퓨터소프트웨어학부 4학년 휴학 중' },
  ],
} as const

export const skillGroups: SkillGroup[] = [
  {
    title: '언어',
    items: ['C++17 / 20 (주력)'],
  },
  {
    title: '엔진 · 프레임워크',
    items: [
      'Unreal Engine 5 (Blueprint / C++)',
      'DirectX 11',
    ],
  },
  {
    title: '툴 · 협업',
    items: [
      'Perforce 기반 팀 협업',
      'Git / Git LFS, GitHub Actions CI',
      'Slack · Notion 기반 협업',
    ],
  },
]

export const timeline: TimelineItem[] = [
  {
    period: '2026.03 — 2026.08',
    title: '크래프톤 정글 게임테크랩 3기',
    org: '크래프톤 정글',
    details: [
      '14주간 매주 팀을 바꿔가며 C++ / DirectX 11 자체 게임 엔진을 제작했습니다.',
      '15주차부터 Epic Project로 UE5 플러그인 DynamicRope를 개발해 Fab에 출시했습니다.',
    ],
  },
  {
    period: '2025.07 — 2025.08',
    title: '카이스트 몰입캠프',
    org: '카이스트',
    details: [
      '4주간 매주 팀을 바꿔 4개 프로젝트를 기획부터 출시까지 완성했습니다.',
      'Android 앱 · AI 영상 제작 웹 · Godot 협동 게임 · 웹 멀티플레이 RPG를 개발했습니다.',
    ],
  },
  {
    period: '2023.03 — 2028.02',
    title: '컴퓨터소프트웨어학부 학사',
    org: '한양대학교',
    details: [
      '컴퓨터그래픽스, 자료구조, 운영체제, 컴퓨터네트워크 이수.',
    ],
  },
]

/** About 페이지의 “작업 방식” 항목. */
export const workingPrinciples: { title: string; body: string }[] = [
  {
    title: '수치로 말하는 최적화',
    body:
      '“빨라진 것 같다”로 끝내지 않습니다. 프로파일러로 기준값을 먼저 재고, ' +
      '변경 후 같은 조건에서 다시 측정해 프레임 타임과 드로우콜 변화로 결과를 남깁니다.',
  },
  {
    title: '기획 변경을 견디는 데이터 구조',
    body:
      '밸런스 수치와 연출 파라미터는 코드에서 분리해 데이터로 뺍니다. 기획자가 직접 수정할 수 있으면 ' +
      '빌드 대기 없이 반복 실험이 가능하고, 클라이언트 코드도 단순해집니다.',
  },
  {
    title: '재현 가능한 버그 리포트',
    body:
      '버그를 만나면 먼저 최소 재현 절차를 만듭니다. 재현이 되면 원인 추적과 회귀 테스트가 쉬워지고, ' +
      '팀에 공유할 때도 설명이 짧아집니다.',
  },
]
