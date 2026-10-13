import type { SkillGroup, TimelineItem } from '../types'

export const profile = {
  name: 'Seyoung Park',
  nameKo: '박세영',
  headline: '엔진을 직접 만들어 봤기에, 엔진 내부까지 파고들어 문제를 해결합니다.',
  intro:
    'C++와 Unreal Engine 5로 게임 클라이언트를 만듭니다. 크래프톤 정글 게임테크랩에서 14주간 ' +
    '자체 게임 엔진을 만들었고, 그 경험을 바탕으로 UE5 플러그인 DynamicRope를 개발해 Fab에 출시했습니다.',
  location: 'Seoul, KR',
  email: 'seyoungpark@hanyang.ac.kr',
  githubUrl: 'https://github.com/mathison0',
  bojUrl: 'https://solved.ac/profile/seyoungpark',
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
      text: '카이스트 몰입캠프 수료 — 4.5주간 4개 프로젝트 완성 (Godot · Phaser 멀티플레이 게임 등)',
      links: [
        { label: 'FLYFRY', href: '/projects/flyfry' },
        { label: 'RPG SLIME', href: '/projects/rpg-slime' },
      ],
    },
    {
      text: '백준 Platinum 5 — 알고리즘 동아리 ALOHA 운영진·멘토, HCPC Beginner 부문 대상',
      links: [{ label: 'solved.ac', href: 'https://solved.ac/profile/seyoungpark' }],
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
      '4.5주간 매주 팀을 바꿔 4개 프로젝트를 기획부터 출시까지 완성했습니다.',
      'Android 앱 · AI 영상 제작 웹 · Godot 협동 게임 · 웹 멀티플레이 RPG를 개발했습니다.',
    ],
  },
  {
    period: '2023.03 — 2025.02',
    title: '알고리즘 동아리 ALOHA · 운영진',
    org: '한양대학교',
    details: [
      '운영진이자 멘토로 활동하며 알고리즘 스터디를 이끌고 동아리내/교내 알고리즘 대회(HCPC)를 운영했습니다.',
      'HCPC(한양대 프로그래밍 경시대회) Beginner 부문 대상을 수상했습니다.',
      '백준 solved.ac Platinum 5 달성.',
    ],
  },
  {
    period: '2023.03 — 재학 중 (2028.02 졸업 예정)',
    title: '컴퓨터소프트웨어학부 학사',
    org: '한양대학교',
    details: [
      '그래픽스·수학 — 컴퓨터그래픽스, 선형대수, 수치해석',
      '시스템 — 운영체제, 시스템프로그래밍, 컴퓨터구조론',
      '기반 — 자료구조론, 알고리즘및문제해결기법, 컴퓨터네트워크, 객체지향시스템설계',
    ],
  },
]
