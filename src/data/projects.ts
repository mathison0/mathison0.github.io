import type { Project } from '../types'

/**
 * ⚠️ 아래 프로젝트는 구조를 보여주는 예시(플레이스홀더)입니다.
 *
 * 영상 연결 방법
 *  - YouTube:  video: { kind: 'youtube', id: 'dQw4w9WgXcQ', caption: '플레이 영상' }
 *  - 로컬 파일: public/videos/foo.mp4 에 두고
 *              video: { kind: 'file', src: '/videos/foo.mp4', poster: '/videos/foo.jpg' }
 *  - 아직 없음: video: { kind: 'placeholder', caption: '영상 준비 중' }
 *
 * 로컬 mp4는 저장소 용량을 빠르게 잡아먹으므로(GitHub 권장 100MB/파일 이하)
 * 30초 내외로 자르거나 YouTube 링크를 쓰는 편이 안전합니다.
 */
export const projects: Project[] = [
  {
    slug: 'shatterline',
    title: 'Shatterline',
    tagline: '근접 전투 중심 3D 액션 로그라이크의 전투·캐릭터 클라이언트',
    summary:
      '4인 팀 프로젝트에서 클라이언트 전투 시스템 전체를 담당했습니다. 공격 캔슬과 무적 프레임까지 ' +
      '프레임 단위로 제어되는 상태 머신을 만들고, 밸런스 수치를 데이터로 분리해 기획자가 빌드 없이 ' +
      '조정할 수 있게 했습니다.',
    period: '2025.09 — 2026.01 (5개월)',
    role: '클라이언트 개발 (전투 · 캐릭터 컨트롤)',
    team: '4명 (클라이언트 2 · 아트 1 · 기획 1)',
    platform: 'PC (Windows) / Steam Deck 검증',
    engine: 'Unity 6 · URP',
    tags: ['Unity', 'C#', 'Gameplay', 'Optimization'],
    featured: true,
    video: { kind: 'placeholder', caption: '전투 시스템 플레이 영상 (2분 30초)' },
    extraMedia: [
      { kind: 'placeholder', caption: '히트박스 디버그 뷰 — 프레임 데이터 시각화' },
    ],
    responsibilities: [
      '플레이어 캐릭터 이동·회피·공격 상태 머신 설계 및 구현',
      '히트박스/허트박스 판정과 피격 리액션, 카메라 셰이크 연출 연결',
      '무기 3종 · 스킬 12종의 데이터 스키마 설계와 밸런스 툴 제작',
      '전투 구간 프레임 타임 프로파일링 및 최적화',
    ],
    features: [
      {
        title: '프레임 단위로 제어되는 액션 상태 머신',
        tech: ['C#', 'Animator StateMachineBehaviour'],
        body:
          '공격 모션을 시동(startup) · 판정(active) · 후딜(recovery) 구간으로 나누고, 각 구간의 프레임 수를 ' +
          '데이터로 정의했습니다. 캔슬 가능 시점과 무적 프레임을 같은 테이블에서 관리하므로 “3번째 공격만 ' +
          '회피로 캔슬 가능” 같은 요구를 코드 수정 없이 반영할 수 있습니다.',
      },
      {
        title: '입력 버퍼와 선입력 허용',
        tech: ['Unity Input System'],
        body:
          '후딜 중 들어온 입력을 최대 8프레임까지 큐에 보관해 다음 상태 진입 시점에 소비합니다. ' +
          '테스터 피드백에서 가장 많이 나왔던 “콤보가 씹힌다”는 지적을 해결한 변경이었고, ' +
          '버퍼 길이는 인스펙터에서 조절 가능하게 두어 감각을 반복 실험했습니다.',
      },
      {
        title: '데이터 주도 밸런스 파이프라인',
        tech: ['ScriptableObject', 'Editor Tool'],
        body:
          '스킬 계수·쿨타임·상태이상 지속시간을 CSV에서 ScriptableObject로 임포트하는 에디터 툴을 만들었습니다. ' +
          '기획자가 스프레드시트를 갱신하고 메뉴 한 번을 누르면 플레이 모드에 바로 반영됩니다.',
      },
      {
        title: '오브젝트 풀 기반 이펙트 관리',
        tech: ['C#', 'Addressables'],
        body:
          '타격 이펙트와 투사체를 풀에서 재사용하고, 스테이지 진입 시 필요한 에셋만 Addressables로 ' +
          '미리 로드합니다. 전투 중 인스턴스 생성으로 발생하던 GC 스파이크를 없애는 것이 목적이었습니다.',
      },
    ],
    caseStudies: [
      {
        problem:
          '적 20마리가 동시에 등장하는 3스테이지에서 프레임 타임이 22ms까지 튀어 체감 가능한 끊김이 있었습니다.',
        approach:
          'Unity Profiler로 구간을 나눠 측정한 결과, 매 프레임 각 적이 플레이어 탐색을 위해 ' +
          'Physics.OverlapSphere를 호출하는 부분과 이펙트 인스턴스 생성 시 GC Alloc이 원인이었습니다. ' +
          '탐색은 0.2초 주기의 중앙 스케줄러로 옮겨 프레임마다 일부 적만 갱신하도록 분산하고, ' +
          '이펙트는 오브젝트 풀로 교체했습니다.',
        result:
          '같은 스테이지 동일 구간에서 평균 프레임 타임 22ms → 13ms, GC Alloc 프레임당 약 40KB → 0.6KB로 ' +
          '줄었고 끊김 리포트가 사라졌습니다.',
      },
      {
        problem:
          '피격 판정이 눈에 보이는 모션과 어긋난다는 피드백이 반복됐지만, 원인을 말로 설명하기 어려웠습니다.',
        approach:
          '런타임에 히트박스와 현재 프레임 인덱스, 상태 이름을 화면에 겹쳐 그리는 디버그 오버레이를 만들었습니다. ' +
          '프레임을 정지·전진시키며 확인할 수 있게 하니, 애니메이션 이벤트 타이밍이 실제 모션보다 ' +
          '2프레임 앞서 발생하는 것이 바로 보였습니다.',
        result:
          '타이밍 오차를 수정했고, 이후 전투 밸런스 논의가 “애매한 느낌” 대신 프레임 숫자로 진행되어 ' +
          '기획 커뮤니케이션 비용이 크게 줄었습니다.',
      },
    ],
    takeaways: [
      '액션 게임의 “손맛”은 대부분 프레임 단위 수치의 문제이며, 눈으로 볼 수 있게 만들면 논의가 빨라집니다.',
      '최적화는 추측이 아니라 측정에서 시작해야 한다는 것을 프로파일러로 체득했습니다.',
    ],
    links: [
      { label: 'GitHub 저장소', href: 'https://github.com/mathison0' },
      { label: '기술 문서 (Notion)', href: 'https://github.com/mathison0' },
    ],
  },
  {
    slug: 'aurora-renderer',
    title: 'Aurora Renderer',
    tagline: 'DirectX 11 기반 자체 3D 렌더러 — 디퍼드 셰이딩과 그림자',
    summary:
      '엔진이 대신 해주던 일을 직접 구현해 보기 위해 만든 개인 프로젝트입니다. 디퍼드 셰이딩 파이프라인, ' +
      '캐스케이드 섀도우 맵, 프러스텀 컬링을 구현하고 각 단계의 GPU 시간을 측정했습니다.',
    period: '2025.03 — 2025.08 (6개월, 개인)',
    role: '개인 프로젝트 (전체)',
    team: '1명',
    platform: 'PC (Windows 10/11)',
    engine: '자체 엔진 · DirectX 11',
    tags: ['C++', 'Graphics', 'DirectX'],
    featured: true,
    video: { kind: 'placeholder', caption: '렌더러 데모 영상 (1분 40초)' },
    responsibilities: [
      'G-Buffer 구성과 라이팅 패스 설계',
      '캐스케이드 섀도우 맵 및 PCF 소프트 섀도우 구현',
      '프러스텀 컬링과 인스턴싱 기반 드로우콜 배칭',
      'GPU 타임스탬프 쿼리를 이용한 패스별 성능 측정 도구',
    ],
    features: [
      {
        title: '디퍼드 셰이딩 파이프라인',
        tech: ['C++', 'HLSL', 'DirectX 11'],
        body:
          '알베도·노멀·러프네스/메탈릭·깊이를 4장의 렌더 타겟에 기록하고, 라이팅 패스에서 화면 공간으로 ' +
          '조명을 계산합니다. 포워드 방식 대비 광원 수가 늘어날 때의 비용 증가가 훨씬 완만해지는 것을 ' +
          '광원 개수별 측정으로 확인했습니다.',
      },
      {
        title: '캐스케이드 섀도우 맵',
        tech: ['HLSL'],
        body:
          '카메라 프러스텀을 거리별 4단계로 분할해 각 구간에 별도 섀도우 맵을 할당했습니다. ' +
          '경계에서 생기는 접합선은 캐스케이드 간 블렌딩으로, 셀프 섀도잉 아티팩트는 ' +
          '노멀 오프셋 바이어스로 완화했습니다.',
      },
      {
        title: '패스별 GPU 프로파일러',
        tech: ['C++', 'D3D11 Query'],
        body:
          '타임스탬프 쿼리로 G-Buffer·섀도우·라이팅·포스트 패스의 GPU 시간을 프레임마다 수집해 ' +
          '오버레이에 표시합니다. 어떤 최적화가 실제로 효과가 있었는지 즉시 확인하는 것이 목적이었습니다.',
      },
      {
        title: 'ASSIMP 기반 에셋 임포터',
        tech: ['C++', 'assimp'],
        body:
          'FBX/glTF 모델과 머티리얼을 자체 바이너리 포맷으로 변환하는 오프라인 툴을 만들어 ' +
          '런타임 로딩 시간을 줄였습니다.',
      },
    ],
    caseStudies: [
      {
        problem:
          '5만 개 오브젝트가 있는 테스트 씬에서 CPU가 드로우콜 제출에만 시간을 다 쓰며 프레임이 무너졌습니다.',
        approach:
          '먼저 프러스텀 컬링으로 화면 밖 오브젝트를 제외하고, 남은 오브젝트를 메시·머티리얼 기준으로 ' +
          '정렬해 동일 조합을 인스턴싱으로 한 번에 제출했습니다. 상수 버퍼 업데이트도 오브젝트당 갱신에서 ' +
          '배치당 갱신으로 바꿨습니다.',
        result:
          '드로우콜이 약 50,000회에서 700회 수준으로 줄고, 같은 씬의 프레임 타임이 41ms → 9ms가 됐습니다.',
      },
      {
        problem:
          '넓은 야외 씬에서 그림자 해상도가 부족해 근거리 그림자가 뭉개졌습니다.',
        approach:
          '단일 섀도우 맵을 캐스케이드 4단계로 나누고, 분할 거리를 로그·균등 혼합 방식으로 계산했습니다. ' +
          '분할 비율을 실시간으로 조절하며 근거리 품질과 원거리 낭비를 비교했습니다.',
        result:
          '섀도우 맵 총 메모리를 늘리지 않고 근거리 유효 해상도를 약 4배로 확보했습니다.',
      },
    ],
    takeaways: [
      '엔진의 렌더 설정이 무엇을 감추고 있는지 알게 되면서, Unity URP에서의 판단도 빨라졌습니다.',
      'GPU/CPU 중 어디가 병목인지 먼저 가르는 습관이 생겼습니다.',
    ],
    links: [{ label: 'GitHub 저장소', href: 'https://github.com/mathison0' }],
  },
  {
    slug: 'linkup-coop',
    title: 'LinkUp',
    tagline: '2인 협동 액션 프로토타입 — 클라이언트 예측과 서버 보정',
    summary:
      '지연이 있는 환경에서도 조작이 즉각 반응하도록 클라이언트 예측·서버 보정·스냅샷 보간을 구현한 ' +
      '네트워크 학습 프로젝트입니다. 인위적으로 RTT와 패킷 손실을 주입해 동작을 검증했습니다.',
    period: '2025.05 — 2025.07 (3개월)',
    role: '클라이언트 네트워크 동기화',
    team: '3명 (클라이언트 2 · 서버 1)',
    platform: 'PC',
    engine: 'Unity 6 · 자체 UDP 서버(C#)',
    tags: ['Unity', 'C#', 'Network', 'Gameplay'],
    featured: true,
    video: { kind: 'placeholder', caption: '지연 200ms 환경 동기화 비교 영상' },
    responsibilities: [
      '입력 기반 클라이언트 예측과 서버 보정(rollback & replay) 구현',
      '원격 플레이어 스냅샷 보간 및 외삽 처리',
      '패킷 직렬화 포맷 설계와 대역폭 측정',
      '네트워크 상태 시각화 디버그 HUD 제작',
    ],
    features: [
      {
        title: '입력 예측과 롤백 재적용',
        tech: ['C#', 'UDP'],
        body:
          '클라이언트는 입력을 즉시 로컬에 적용하고 시퀀스 번호와 함께 서버로 보냅니다. ' +
          '서버 상태가 도착하면 해당 시점으로 되돌린 뒤 아직 확정되지 않은 입력들을 다시 시뮬레이션해 ' +
          '현재 프레임을 재구성합니다.',
      },
      {
        title: '고정 틱 시뮬레이션 분리',
        tech: ['C#'],
        body:
          '게임 로직을 60Hz 고정 틱으로 돌리고 렌더링은 가변 프레임으로 두어, 같은 입력이 같은 결과를 ' +
          '내도록 만들었습니다. 예측과 서버 재현이 일치하기 위한 전제 조건이었습니다.',
      },
      {
        title: '스냅샷 보간 버퍼',
        tech: ['C#'],
        body:
          '원격 플레이어는 100ms 뒤처진 시점을 보간해 표시합니다. 패킷이 한두 개 유실돼도 끊기지 않고, ' +
          '버퍼가 마르면 짧게 외삽한 뒤 다음 스냅샷에서 부드럽게 되돌립니다.',
      },
      {
        title: '네트워크 상태 HUD',
        tech: ['C#', 'Unity UI'],
        body:
          'RTT, 지터, 초당 패킷·바이트, 예측 오차 보정량을 실시간 그래프로 표시합니다. ' +
          '“튀는 것 같다”는 현상을 수치로 재현하는 데 사용했습니다.',
      },
    ],
    caseStudies: [
      {
        problem:
          'RTT 200ms를 주입하면 회피 동작이 마친 뒤 캐릭터가 뒤로 튕겨 돌아가는 현상이 나타났습니다.',
        approach:
          '디버그 HUD로 확인해 보니 서버 확정 상태와 예측 상태의 차이가 임계값을 넘을 때마다 위치를 ' +
          '즉시 덮어쓰고 있었습니다. 보정을 즉시 스냅에서 오차 크기에 따른 점진 보정으로 바꾸고, ' +
          '큰 오차일 때만 스냅하도록 임계값을 나눴습니다.',
        result:
          '동일 지연 조건에서 눈에 보이는 되돌림이 사라졌고, 평균 예측 오차는 12cm 수준으로 수렴했습니다.',
      },
      {
        problem:
          '플레이어 수가 늘자 상태 패킷 대역폭이 빠르게 증가했습니다.',
        approach:
          '전체 상태를 매 틱 보내는 대신 마지막 확정 스냅샷과의 델타만 전송하고, 회전은 쿼터니언 대신 ' +
          '압축된 각도로 보냈습니다.',
        result:
          '플레이어당 상태 트래픽이 약 60% 줄어 같은 조건에서 더 잦은 갱신 주기를 감당할 수 있었습니다.',
      },
    ],
    takeaways: [
      '네트워크 동기화 문제는 “언제의 상태를 보여줄지” 결정하는 문제라는 점을 이해했습니다.',
      '지연·손실 주입 도구를 먼저 만들어야 문제를 재현할 수 있습니다.',
    ],
    links: [{ label: 'GitHub 저장소', href: 'https://github.com/mathison0' }],
  },
  {
    slug: 'levelforge-tool',
    title: 'LevelForge',
    tagline: '레벨 배치 작업을 줄인 Unity 에디터 확장 툴',
    summary:
      '레벨 디자이너가 수작업으로 반복하던 오브젝트 배치·검증 과정을 에디터 툴로 옮긴 내부 도구입니다. ' +
      '배치 규칙 위반을 빌드 전에 잡아내는 검사 기능까지 포함합니다.',
    period: '2025.10 — 2025.11 (2개월)',
    role: '에디터 툴 개발',
    team: '2명',
    platform: 'Unity Editor',
    engine: 'Unity 6',
    tags: ['Unity', 'C#', 'Tools'],
    featured: false,
    video: { kind: 'placeholder', caption: '툴 사용 화면 녹화 (1분)' },
    responsibilities: [
      '브러시 방식 프리팹 배치 툴 (UI Toolkit) 구현',
      '레벨 규칙 검사기와 오류 목록 패널 제작',
      '씬 저장 시 자동 검증 훅 연결',
    ],
    features: [
      {
        title: '규칙 기반 배치 브러시',
        tech: ['C#', 'UI Toolkit', 'Handles'],
        body:
          '표면 노멀 정렬, 최소 간격, 랜덤 스케일/회전 범위를 프리셋으로 저장해 두고 씬 뷰에서 칠하듯 ' +
          '배치합니다. 프리셋은 팀에서 공유해 씬 간 톤을 맞추는 데 사용했습니다.',
      },
      {
        title: '레벨 검증기',
        tech: ['C#', 'Editor'],
        body:
          '길 밖으로 나간 스폰 포인트, 겹친 콜라이더, 도달 불가 지형 같은 규칙 위반을 목록으로 보여주고 ' +
          '항목을 누르면 해당 오브젝트로 카메라가 이동합니다.',
      },
    ],
    caseStudies: [
      {
        problem:
          '레벨 하나를 채우는 데 반나절이 들었고, 배치 실수는 대부분 QA 단계에서야 발견됐습니다.',
        approach:
          '실제 작업 과정을 관찰해 반복 동작을 추리고, 가장 잦았던 “정렬 후 미세 조정”을 브러시 프리셋으로 ' +
          '자동화했습니다. 동시에 QA에서 반복 보고된 실수 유형을 규칙으로 코드화했습니다.',
        result:
          '레벨 1개 초안 배치 시간이 약 4시간에서 1시간으로 줄었고, 배치 관련 QA 리포트가 눈에 띄게 감소했습니다.',
      },
    ],
    links: [{ label: 'GitHub 저장소', href: 'https://github.com/mathison0' }],
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
