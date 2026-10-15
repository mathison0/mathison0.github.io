import type { SkillGroup, TimelineItem } from '../types'

export const profile = {
  name: 'Seyoung Park',
  nameKo: '박세영',
  /** 구절 단위로 나눠 두면 화면이 넓을 때 구절 경계(쉼표)에서만 줄이 바뀐다. */
  headline: [
    '자체 게임 엔진, UE5 물리 플러그인, 게임 AI 봇과 강화학습 환경을 만들며',
    '엔진 내부부터 그 위의 시뮬레이션과 AI 학습 · 평가 환경까지 직접 다룰 수 있게 됐습니다.',
  ],
  /** 링크 미리보기(SEO description)용 소개. 화면에는 headline이 소개 역할을 한다. */
  intro:
    '크래프톤 정글 게임테크랩에서 14주간 C++와 DirectX 11로 자체 게임 엔진을 만들었고, ' +
    '그 경험을 바탕으로 Unreal Engine 5용 GPU 로프 시뮬레이션 플러그인 DynamicRope를 개발해 ' +
    'Fab에 출시했습니다.',
  location: 'Seoul, KR',
  email: 'seyoungpark@hanyang.ac.kr',
  githubUrl: 'https://github.com/mathison0',
  bojUrl: 'https://solved.ac/profile/seyoungpark',
  resumeUrl: '', // 이력서 PDF를 public/ 에 두고 '/resume.pdf' 처럼 지정
  /**
   * 홈 첫 화면의 커버 레터(요약): 결과를 앞(lead, 굵게)에, 맥락을 뒤(text)에 둔다.
   * links를 주면 해당 줄 끝에 링크가 붙는다.
   *  - '#project-<slug>': 같은 페이지의 대표 카드로 스크롤하고 카드를 잠깐 강조 (↓)
   *  - '/...': 다른 페이지 (→), 그 외: 외부 URL (↗)
   */
  highlights: [
    {
      lead: 'UE5 플러그인 DynamicRope Fab 출시',
      text: 'GPU 로프 시뮬레이션',
      links: [{ label: '프로젝트', href: '#project-dynamic-rope' }],
    },
    {
      lead: 'C++ / DirectX 11 자체 게임 엔진 14주 제작',
      text: '크래프톤 정글 게임테크랩',
      links: [{ label: '프로젝트', href: '#project-gametechlab-engine' }],
    },
    {
      lead: 'SKKU × HYU CSE 교류전 AI 부문 3위',
      text: '시뮬레이션 기반 봇 · 평가 하네스 · RL 실험',
      links: [{ label: '프로젝트', href: '#project-lucky-punch' }],
    },
    {
      lead: '백준 Platinum 5 · 알고리즘 동아리 ALOHA 운영진 · HCPC Beginner 대상',
      links: [{ label: 'solved.ac', href: 'https://solved.ac/profile/seyoungpark' }],
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
    items: ['C++17 / 20 (주력)', 'Python', 'JavaScript'],
  },
  {
    title: '엔진 · 프레임워크',
    items: [
      'Unreal Engine 5',
      'DirectX 11',
      'Node.js',
    ],
  },
  {
    title: '툴 · 협업',
    items: [
      'Git',
      'Perforce',
      'Slack · Notion',
      'Claude Code',
    ],
  },
]

export const timeline: TimelineItem[] = [
  {
    period: '2026.09',
    title: '2026 SKKU × HYU CSE 교류전 AI 부문 · 3위',
    org: '성균관대학교 × 한양대학교',
    details: [
      '3인 팀으로 피카츄 배구 봇 대회 참가, 3위 수상.',
      '시뮬레이션 기반 룰 봇과 오프라인 대전 하네스 제작, 대회 후 RL 환경으로 확장해 PPO와 비교.',
    ],
  },
  {
    period: '2026.03 ~ 2026.08',
    title: '크래프톤 정글 게임테크랩 3기',
    org: '크래프톤 정글',
    details: [
      '14주간 매주 팀을 바꿔가며 C++ / DirectX 11 자체 게임 엔진 제작.',
      '15주차부터 Epic Project로 UE5 플러그인 DynamicRope 개발, Fab 출시.',
    ],
  },
  {
    period: '2025.07 ~ 2025.08',
    title: '카이스트 몰입캠프',
    org: '카이스트',
    details: [
      '4.5주간 매주 팀을 바꿔 4개 프로젝트를 기획부터 구현·시연까지 완성.',
      'Android 앱 · AI 영상 제작 웹 · Godot 협동 게임 · 웹 멀티플레이 RPG 개발.',
    ],
  },
  {
    period: '2023.03 ~ 2025.02',
    title: '알고리즘 동아리 ALOHA',
    org: '한양대학교',
    details: [
      '2024.03부터 운영진이자 멘토로 알고리즘 스터디를 이끌고 동아리 내/교내 알고리즘 대회(HCPC) 운영.',
      'HCPC(한양대 프로그래밍 경시대회) Beginner 부문 대상 수상(2023.12).',
      '백준 solved.ac Platinum 5 달성.',
    ],
  },
  {
    period: '2023.03 ~ 휴학 중 (2028.02 졸업 예정)',
    title: '컴퓨터소프트웨어학부 학사',
    org: '한양대학교',
    details: [
      '그래픽스·수학: 컴퓨터그래픽스, 선형대수, 수치해석',
      '시스템: 운영체제, 시스템프로그래밍, 컴퓨터구조론',
      '기반: 자료구조론, 알고리즘및문제해결기법, 컴퓨터네트워크, 객체지향시스템설계',
    ],
  },
]
