import type { SkillGroup, TimelineItem } from '../types'

/**
 * ⚠️ 이 파일의 내용은 예시(플레이스홀더)입니다.
 * 이름·연락처·이력을 본인 정보로 교체하세요.
 */
export const profile = {
  name: 'Seyoung Park',
  nameKo: '박세영',
  role: 'Game Client Developer',
  headline: '플레이가 손에 붙는 감각을, 재현 가능한 구조로 만듭니다.',
  intro:
    'Unity와 C++로 게임 클라이언트를 만듭니다. 전투 로직과 캐릭터 컨트롤처럼 “느낌”이 중요한 영역을 ' +
    '수치와 상태 기계로 분해해 구현하고, 프로파일러 결과로 검증하는 방식으로 작업합니다.',
  location: 'Seoul, KR',
  email: 'seyoungpark@hanyang.ac.kr',
  githubUrl: 'https://github.com/mathison0',
  resumeUrl: '', // 이력서 PDF를 public/ 에 두고 '/resume.pdf' 처럼 지정
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
      'Unreal Engine 5 (Blueprint / C++ 기초)',
      'DirectX 11 자체 렌더러',
    ],
  },
  {
    title: '게임플레이',
    items: [
      '캐릭터 컨트롤 · 애니메이션 스테이트 머신',
      '전투 판정 (히트박스, 프레임 데이터)',
      'AI 행동 트리 · 유틸리티 기반 판단',
      '데이터 주도 설계 (ScriptableObject, JSON 테이블)',
    ],
  },
  {
    title: '그래픽스',
    items: [
      '렌더 파이프라인 (Forward / Deferred)',
      '셰이더 작성 · 머티리얼 최적화',
      '섀도우 맵, 포스트 프로세싱',
      'GPU / CPU 병목 프로파일링',
    ],
  },
  {
    title: '네트워크',
    items: [
      '클라이언트 예측 · 서버 보정',
      '스냅샷 보간, 지연 보상',
      'TCP / UDP 소켓, 패킷 직렬화',
    ],
  },
  {
    title: '툴 · 협업',
    items: [
      'Git / Git LFS, Perforce 기초',
      'Unity Editor 확장 툴 제작',
      'GitHub Actions CI, 자동 빌드',
      'Jira · Notion 기반 협업',
    ],
  },
]

export const timeline: TimelineItem[] = [
  {
    period: '2024.03 — 2026.02',
    title: '게임 개발 동아리 · 클라이언트 파트장',
    org: 'OO대학교',
    details: [
      '4개 팀 프로젝트에서 클라이언트 구조 설계와 코드 리뷰를 담당했습니다.',
      '신입 부원 대상 Unity 게임플레이 구현 스터디를 2기 운영했습니다.',
    ],
  },
  {
    period: '2025.07 — 2025.08',
    title: '게임 클라이언트 인턴',
    org: 'OO 스튜디오',
    details: [
      '라이브 프로젝트의 UI 흐름 리팩터링과 버그 수정 티켓을 처리했습니다.',
      '모바일 저사양 기기 프레임 드랍 이슈를 프로파일링해 원인 리포트를 작성했습니다.',
    ],
  },
  {
    period: '2023.03 — 2028.02',
    title: '컴퓨터소프트웨어학부 학사',
    org: '한양대학교',
    details: [
      '컴퓨터그래픽스, 자료구조, 운영체제, 컴퓨터네트워크 이수.',
      '졸업 프로젝트로 자체 DirectX 11 렌더러를 제작했습니다.',
    ],
  },
]

/** About 페이지의 “작업 방식” 항목. */
export const workingPrinciples: { title: string; body: string }[] = [
  {
    title: '수치로 말하는 최적화',
    body:
      '“빨라진 것 같다”로 끝내지 않습니다. Unity Profiler·RenderDoc으로 기준값을 먼저 재고, ' +
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
