import type { Project } from '../types'

/**
 * 영상 연결 방법
 *  - YouTube:  video: { kind: 'youtube', id: 'iRLpnem_LfQ', caption: '...' }
 *  - 로컬 파일: public/videos/foo.mp4 에 두고
 *              video: { kind: 'file', src: '/videos/foo.mp4', poster: '/videos/foo.jpg' }
 *  - 아직 없음: video: { kind: 'placeholder', caption: '영상 준비 중' }
 *
 * ⚠️ caseStudies(문제 해결 사례)와 일부 responsibilities는 본인이 실제 겪은
 *    내용으로 채워야 합니다. 비워 두면 해당 섹션은 표시되지 않습니다.
 */
export const projects: Project[] = [
  {
    slug: 'dynamic-rope',
    title: 'DynamicRope',
    tagline: 'GPU XPBD 로프 시뮬레이션 · 본 래핑 — Fab 출시 UE5 플러그인',
    summary:
      '던진 로프가 날아가 충돌하고, 스켈레탈 캐릭터의 본(bone)을 물리적으로 감아 붙잡고 끌어당기는 ' +
      'Unreal Engine 5 플러그인입니다. 게임테크랩 Epic Project로 개발해 Fab 마켓플레이스에 출시했으며, ' +
      '솔버·충돌 감지·튜브 메싱이 모두 GPU(RDG 컴퓨트)에서 동작하고 CPU 폴백 경로를 갖추고 있습니다.',
    period: '2026.06 — 2026.08',
    role: '팀 개발 (TeamKeno)',
    team: 'TeamKeno',
    platform: 'Windows (UE 5.5 — 5.8)',
    engine: 'Unreal Engine 5 · C++',
    tags: ['Unreal', 'C++', 'Physics', 'GPU', 'Plugin'],
    featured: true,
    video: {
      kind: 'youtube',
      id: 'iRLpnem_LfQ',
      caption: 'DynamicRope 공식 데모 영상',
    },
    responsibilities: [
      'GPU XPBD 솔버 — 시뮬레이션·충돌 감지·튜브 메싱을 RDG 컴퓨트 셰이더로 구현, CPU 폴백 유지',
      '본 단위 래핑 — 애니메이션 중인 스켈레탈 메시의 본을 로프가 감고 따라가는 시스템',
      '레그돌 연동 — 감긴 레그돌을 엔진 물리 컨스트레인트로 붙잡아 Chaos와 함께 해석',
      '장력 기반 당기기 · 릴 감기 · 거리 기반 해제 등 게임플레이 상호작용',
    ],
    features: [
      {
        title: 'GPU 단일 런타임 경로와 CPU 폴백',
        tech: ['C++', 'RDG', 'Compute Shader (.usf)'],
        body:
          'XPBD 솔버와 튜브 빌더를 RDG 컴퓨트로 구현해 렌더링 가능한 RHI가 있으면 GPU 경로가 자동 선택됩니다. ' +
          '데디케이티드 서버·쿡·초대형 로프는 CPU 솔버로 자동 폴백하며, CPU 구현은 패리티 검증과 ' +
          '유닛 테스트의 기준으로도 사용합니다.',
      },
      {
        title: '두 가지 충돌 백엔드',
        tech: ['C++', 'SDF'],
        body:
          '본별 해석적 캡슐과, 미리 굽는(bake) 본별 SDF 볼륨을 하나의 인터페이스 뒤에 두고 선택할 수 있습니다. ' +
          'SDF 베이킹용 에디터 툴을 플러그인에 포함했고, 스켈레탈이 아닌 단순 콜리전 프롭과 ' +
          '월드 디스턴스 필드 충돌도 지원합니다.',
      },
      {
        title: '자체 버텍스 팩토리로 모션 벡터 해결',
        tech: ['C++', 'FLocalVertexFactory'],
        body:
          '매 프레임 변형되는 로프 튜브는 일반적인 방법으로는 TSR/TAA 고스팅이 생깁니다. ' +
          '로프 전용 버텍스 팩토리로 엔진의 GPU 스킨 패스스루 셰이더 분기를 활용해 ' +
          '정점별 모션 벡터를 정확히 공급, 고스팅과 모션 블러 번짐을 없앴습니다.',
      },
      {
        title: '제품 수준의 마감',
        tech: ['C++', 'Enhanced Input', 'Gameplay Debugger'],
        body:
          '던지기/당기기/해제가 준비된 위엘더 컴포넌트, 프리셋 에셋, stat DynamicRope 프로파일링 대시보드, ' +
          '슬립·거리 LOD·컬링, 블루프린트 노출 API와 자동화 테스트까지 — 외부에 판매되는 플러그인으로서 ' +
          '필요한 표면을 갖춰 출시했습니다. 출시 후 Fab 평점 5.0을 유지하고 있습니다.',
      },
    ],
    caseStudies: [],
    takeaways: [
      '엔진 소스를 따라 들어가며 렌더러(버텍스 팩토리, 모션 벡터)와 물리(Chaos 컨스트레인트)의 실제 동작을 이해하게 됐습니다.',
      '내부용 데모와 “팔 수 있는 플러그인” 사이의 간격 — 폴백 경로, 프로파일링, 문서화 — 을 메우는 일이 절반 이상이었습니다.',
    ],
    links: [
      {
        label: 'Fab 스토어 페이지',
        href: 'https://www.fab.com/listings/17f62a8f-387b-48b0-9198-af7273dc3733',
      },
      { label: '공식 문서', href: 'https://teamkeno.github.io/DynamicRopeDocs/' },
      { label: 'GitHub 저장소', href: 'https://github.com/TeamKeno/DynamicRope' },
    ],
  },
  {
    slug: 'gametechlab-engine',
    title: '자체 게임 엔진 (게임테크랩)',
    tagline: 'C++ / DirectX 11 자체 게임 엔진 — 14주, 매주 다른 팀과 제작',
    summary:
      '크래프톤 정글 게임테크랩 3기에서 14주 동안 자체 게임 엔진을 만들었습니다. 매주 팀을 바꿔가며 ' +
      '서로의 엔진 코드를 이어받아 기능을 확장하는 방식으로, 렌더링부터 에디터, 게임잼 실전 투입까지 ' +
      '엔진의 전 영역을 다뤘습니다. 주차별 커밋 히스토리를 보존해 하나의 저장소로 통합했습니다.',
    period: '2026.03 — 2026.06 (14주)',
    role: '엔진 개발 (매주 팀 로테이션)',
    team: '주차별 4~6명 팀 로테이션',
    platform: 'PC (Windows)',
    engine: '자체 엔진 · DirectX 11 · C++',
    tags: ['C++', 'DirectX', 'Graphics', 'Engine'],
    featured: true,
    video: { kind: 'placeholder', caption: '주차별 발표 영상은 저장소 docs/ 폴더 참고' },
    responsibilities: [
      '매주 다른 팀의 엔진 코드베이스를 이어받아 분석하고 그 위에 기능을 확장',
      'DirectX 11 렌더링 파이프라인, 씬/액터 구조, 에디터 기능 구현',
      '14주차 게임잼 — 직접 만든 엔진으로 게임 제작',
      '주차별 저장소를 git subtree로 병합해 커밋 히스토리를 보존한 통합 저장소 구성',
    ],
    features: [
      {
        title: '매주 낯선 코드베이스에 적응',
        tech: ['C++', 'DirectX 11'],
        body:
          '매주 팀이 섞이고 이전 주차 결과물 중 하나를 이어받아 개발합니다. 남이 설계한 구조를 빠르게 ' +
          '파악하고, 깨뜨리지 않으면서 기능을 얹는 훈련을 14주 내내 반복했습니다. 실무에서 기존 코드에 ' +
          '합류하는 상황과 가장 가까운 경험이었습니다.',
      },
      {
        title: '엔진 전 영역을 단계적으로 구현',
        tech: ['C++', 'HLSL'],
        body:
          '초반에는 렌더링 기초(디바이스, 셰이더, 메시)를, 중반에는 씬 구조·피킹·에디터 UI를, ' +
          '후반에는 심화 주제(주차별 +과제)를 다뤘습니다. 13주차 DOF(피사계 심도) 구현처럼 ' +
          '특정 렌더링 기법을 깊게 파는 주차도 있었습니다.',
      },
      {
        title: '게임잼 — 엔진의 최종 시험대',
        tech: ['C++'],
        body:
          '14주차에는 만들어 온 엔진으로 실제 게임을 완성하는 게임잼을 진행했습니다. ' +
          '엔진을 “만드는 입장”과 “쓰는 입장”을 오가며, API 설계가 사용성에 미치는 영향을 체감했습니다.',
      },
    ],
    caseStudies: [],
    takeaways: [
      '엔진이 감추고 있는 일(리소스 수명, 드로우 제출, 에디터-런타임 경계)을 직접 겪어, 상용 엔진에서의 판단이 빨라졌습니다.',
      '협업 도구(Perforce·Git·Slack)와 코드 리뷰가 팀 로테이션 환경에서 왜 필수인지 배웠습니다.',
    ],
    links: [
      {
        label: 'GitHub 저장소 (주차별 통합)',
        href: 'https://github.com/mathison0/Jungle_GameTechLab_Engine',
      },
    ],
  },
  {
    slug: 'slime-rpg',
    title: 'SLIME RPG',
    tagline: '웹 실시간 멀티플레이 팀전 PVP RPG — 몰입캠프 4주차',
    summary:
      '슬라임에서 시작해 전사·궁수·어쌔신·마법사·서포터로 전직하며 싸우는 팀전 PVP 게임입니다. ' +
      'Phaser 3 클라이언트와 Socket.io 서버로 일주일 만에 개발했으며, 시야 제한·미니맵·핑·랭킹 등 ' +
      '실제 출시 게임 수준의 완성도를 목표로 디테일을 채웠습니다.',
    period: '2025.07 (1주)',
    role: '클라이언트 · 서버 개발',
    team: '2명',
    platform: 'Web (브라우저)',
    engine: 'Phaser 3 · Node.js · Socket.io',
    tags: ['Web', 'Network', 'Gameplay', 'JavaScript'],
    featured: true,
    video: { kind: 'placeholder', caption: '플레이 영상 준비 중' },
    responsibilities: [
      '직업 6종(슬라임·전사·어쌔신·궁수·마법사·서포터)의 스킬과 상성 구조 구현',
      'Socket.io 기반 실시간 동기화 — 서버 권위 몬스터 AI, 자동 팀 밸런싱',
      '시야 제한(전장의 안개)과 지나간 지역이 밝혀지는 미니맵/전체맵 시스템',
      '팀원 핑, 레벨 랭킹, 전직 오브제 드롭 등 메타 시스템',
    ],
    features: [
      {
        title: '가위바위보 상성의 직업 설계',
        tech: ['JavaScript', 'Phaser 3'],
        body:
          '전사 < 원거리(마법사·궁수) < 어쌔신 < 전사의 상성 고리를 만들고, 은신·기습(어쌔신), ' +
          '타수 조건 스킬(궁수), 장판·와드(서포터)처럼 직업마다 다른 운영 리듬을 갖게 했습니다.',
      },
      {
        title: '서버 권위 구조',
        tech: ['Node.js', 'Socket.io'],
        body:
          '몬스터 AI·전투 판정·드롭을 모두 서버에서 처리하고 클라이언트는 표시만 담당합니다. ' +
          '맵 중심으로 갈수록 강한 몹이 배치되어 리스크-리워드 동선이 생기도록 했습니다.',
      },
      {
        title: '시야와 정보 시스템',
        tech: ['Phaser 3'],
        body:
          '탐험한 지역만 맵에서 밝혀지는 시야 시스템과 미니맵/전체맵 토글, 휠 클릭 팀원 핑을 구현해 ' +
          '팀전에서 정보 공유가 전략이 되도록 했습니다.',
      },
    ],
    caseStudies: [],
    takeaways: [
      '“쉬워 보이는 기능”도 멀티플레이가 붙는 순간 동기화 문제가 된다는 것을 몸으로 배웠습니다.',
      '일주일 안에 기획—구현—밸런싱을 도는 속도전에서 우선순위 결정이 가장 중요했습니다.',
    ],
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/mathison0/RPG_Slime' },
      {
        label: '프로젝트 소개 (Notion)',
        href: 'https://countingbeats.notion.site/madcamp-project4-slime-rpg',
      },
    ],
  },
  {
    slug: 'flyfry',
    title: 'FLYFRY',
    tagline: '2인 협동 제트팩 게임 — WebRTC P2P 멀티플레이 · 몰입캠프 3주차',
    summary:
      '계란이 전설의 프라이팬에 도달해 후라이가 되기 위해 제트팩을 타고 나는 2인 협동 게임입니다. ' +
      '키는 한 사람당 하나, 조종해야 할 제트팩은 두 개 — 좌우 분사를 각자 맡아 협동해야 합니다. ' +
      'Godot 엔진으로 만들고 WebRTC P2P로 실시간 동기화했습니다.',
    period: '2025.07 (1주)',
    role: '게임플레이 · 조작 구현',
    team: '2명',
    platform: 'PC (Windows)',
    engine: 'Godot Engine · GDScript',
    tags: ['Godot', 'Network', 'Gameplay'],
    featured: false,
    video: { kind: 'placeholder', caption: '플레이 영상 준비 중' },
    responsibilities: [
      '제트팩 물리와 좌/우 분사 조작, 연료 시스템 구현',
      '상태이상·아이템·10종 이상의 장애물 오브젝트 기믹 구현',
      '세이브포인트(계란판)와 낙하 중심의 사망 규칙 등 게임 루프 구현',
    ],
    features: [
      {
        title: '비대칭 협동 조작',
        tech: ['GDScript'],
        body:
          '한 명이 왼쪽 제트팩, 다른 한 명이 오른쪽 제트팩만 조작할 수 있습니다. 연료 제한과 회복 ' +
          '타이밍이 있어 두 사람의 입력 합이 곧 비행 궤적이 되고, 이 긴장감이 게임의 핵심 재미입니다.',
      },
      {
        title: 'WebRTC P2P 실시간 동기화',
        tech: ['Godot', 'WebRTC', 'AWS EC2'],
        body:
          '반응속도가 중요한 게임이라 중앙 서버를 거치지 않는 WebRTC P2P로 전송 지연을 줄였고, ' +
          '최초 연결을 위한 시그널링 서버는 AWS EC2에 올렸습니다. 로비 코드로 친구와 접속합니다.',
      },
      {
        title: '항아리류 난이도 설계',
        tech: ['Godot'],
        body:
          '“죽일 땐 제대로 죽이고, 그 외엔 밑으로 떨어뜨린다”는 원칙으로 맵을 설계했습니다. ' +
          '어렵지만 빠른 루트와 길지만 안전한 루트의 선택지를 주어 반복 도전의 재미를 만들었습니다.',
      },
    ],
    caseStudies: [],
    takeaways: [
      '처음 쓰는 엔진(Godot)으로 일주일 만에 완성하며, 엔진이 달라도 게임 루프·씬 구조라는 공통 문법이 있음을 확인했습니다.',
      '기획부터 출시(exe 배포)까지 게임 개발의 전체 사이클을 처음으로 완주한 프로젝트입니다.',
    ],
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/mathison0/eggpack' },
      {
        label: '프로젝트 소개 (Notion)',
        href: 'https://countingbeats.notion.site/madcamp-project3-flyfry',
      },
    ],
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** 프로젝트 목록에 등장하는 모든 태그 (등장 순서 유지). */
export function allTags(): string[] {
  const seen: string[] = []
  for (const project of projects) {
    for (const tag of project.tags) {
      if (!seen.includes(tag)) seen.push(tag)
    }
  }
  return seen
}
