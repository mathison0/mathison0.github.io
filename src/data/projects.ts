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
    team: '3명 (TeamKeno)',
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
      'SDF 충돌 백엔드 — 본별 SDF 베이커와 오써링 에디터 툴(3D 프리뷰 뷰포트, 양자화 압축으로 에셋 ~4배 절감) 전체 구현',
      '월드 충돌 — 엔진 Global Distance Field를 솔버 컴퓨트에 통합, 박스·컨벡스·ISM 정적 바디 콜라이더 제공자 구현',
      '비-스켈레탈 랩과 테더 — 랩 타겟 추상화, 프롭 감기, 질량 배분 기반 당기기, Pierce(꽂기) 모드와 릴 감기',
      '렌더링 — 로프 전용 버텍스 팩토리로 정점별 모션 벡터 공급(TSR/TAA 고스팅 해결), 컴퓨트 PSO 프리캐싱으로 첫 사용 히칭 제거',
      '솔버 안정화 — 프레임 과부하 시 서브스텝 신축 흡수, 저프레임 관통(터널링)·감쇠 버그 수정',
      '조준 HUD, Gameplay Debugger 진단 뷰, 디테일 패널·프리셋 — 판매용 플러그인의 튜닝 표면 설계',
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
      '라이팅 파이프라인 — Ambient/Directional/Point/Spot 라이트를 UberLit 셰이더로 통합, 셰이더 핫리로드',
      '그림자 — 포인트 라이트 큐브맵 섀도우(PCF), VSM 메모리 최적화, PSM/CSM 모드 전환',
      '스켈레탈 메시와 CPU/GPU 스키닝 — 본 웨이트 히트맵, 스키닝 통계, FBX 축·단위 정규화',
      '캐스케이드 스타일 파티클 시스템 에디터 — 이미터/모듈 편집, 커브 에디터, undo/redo, 에셋 저장',
      'PhysicsAsset 기반 랙돌 — 바디/컨스트레인트 구성, 애니메이션↔랙돌 블렌드 전환',
      '14주차 게임잼에서 UI/HUD·컷씬·사운드 담당, 주차별 저장소를 subtree로 병합한 통합 저장소 구축',
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
    featured: true,
    video: { kind: 'placeholder', caption: '플레이 영상 준비 중' },
    responsibilities: [
      '계란 캐릭터 물리 — 좌/우 분사 힘·각속도·가속도 튜닝, 속도 기반 깨짐 판정과 충돌 판정',
      '게임 루프 — 세이브포인트(계란판)·리스폰, 목숨 시스템, 제트팩 분리, 엔딩 시퀀스 구현',
      '연료 아이템·스왑 포탈 등 오브젝트 기믹과 게임 월드 씬 구성',
      'HUD와 기록 시스템 — 플레이 시간 표시, 클리어 기록 저장',
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
      { label: 'GitHub 저장소', href: 'https://github.com/mathison0/FLYFRY' },
      {
        label: '프로젝트 소개 (Notion)',
        href: 'https://countingbeats.notion.site/madcamp-project3-flyfry',
      },
    ],
  },
  {
    slug: 'rpg-slime',
    title: 'RPG SLIME',
    tagline: '웹 실시간 멀티플레이 팀전 PVP RPG — 몰입캠프 4주차',
    summary:
      '슬라임에서 시작해 전사·궁수·어쌔신·마법사·서포터로 전직하며 싸우는 팀전 PVP 게임입니다. ' +
      'Phaser 3 클라이언트와 Socket.io 서버로 일주일 만에 개발했으며, 시야 제한·미니맵·핑·랭킹 등 ' +
      '실제 출시 게임 수준의 완성도를 목표로 디테일을 채웠습니다.',
    period: '2025.07 (1주)',
    role: '게임플레이 · 스킬 시스템 (클라이언트/서버)',
    team: '2명',
    platform: 'Web (브라우저)',
    engine: 'Phaser 3 · Node.js · Socket.io',
    tags: ['Web', 'Network', 'Gameplay', 'JavaScript'],
    featured: true,
    video: { kind: 'placeholder', caption: '플레이 영상 준비 중' },
    responsibilities: [
      '직업 6종(슬라임·전사·어쌔신·궁수·마법사·서포터)의 스킬 전체 구현 — 은신·기습, 타수 조건 스킬, 장판·와드 등',
      '스킬·전투의 클라이언트-서버 동기화 — 데미지 판정과 이펙트 재생을 Socket.io 이벤트로 일치시키는 작업',
      '투사체 기반 원거리 공격과 근접 판정, 직업별 기본 공격 체계',
      '스킬 쿨타임 UI와 팀원 핑 표시 개선',
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
