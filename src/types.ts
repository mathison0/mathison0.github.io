/** 프로젝트 영상/이미지 소스. 영상이 아직 없으면 'placeholder'를 쓴다. */
export type MediaSource =
  | { kind: 'youtube'; id: string; start?: number; caption?: string }
  | { kind: 'file'; src: string; poster?: string; caption?: string }
  /**
   * 스크린샷 같은 정지 이미지. fit 기본값은 'cover'(영역을 채우고 넘치는 부분은 잘림).
   * 가장자리 UI가 잘리면 안 되는 스크린샷은 'contain'(전체가 보이고 남는 부분은 여백).
   */
  | { kind: 'image'; src: string; alt?: string; fit?: 'cover' | 'contain'; caption?: string }
  | { kind: 'placeholder'; caption?: string }
  /**
   * 그래프처럼 원본 비율을 그대로 보여야 하는 그림. 16:9 상자에 넣지 않고 캡션을 아래에 단다.
   * width·height는 원본 픽셀 크기(레이아웃 밀림 방지), maxWidth는 화면에 그릴 최대 너비(px).
   */
  | {
      kind: 'figure'
      src: string
      alt: string
      width: number
      height: number
      maxWidth?: number
      caption?: string
    }

/** 결과 표. 첫 열은 행 이름으로 렌더링된다. */
export interface DataTable {
  /** 표 위에 붙는 조건 설명 (예: 지연·세트 수). */
  caption?: string
  columns: string[]
  rows: string[][]
  /** 표 아래 주석. */
  notes?: string[]
}

/** 구현 기능 한 항목: 무엇을 어떻게 만들었는지. */
export interface Feature {
  title: string
  tech?: string[]
  body: string
  /** 본문 아래에 붙는 결과 표 (선택). */
  table?: DataTable
  /** 이 기능을 보여주는 스크린샷/영상 (선택). 상세 페이지에서 본문(과 표) 아래에 표시된다. */
  media?: MediaSource
}

/** 문제 → 접근 → 결과. 기술적 판단 근거를 보여주는 블록. */
export interface CaseStudy {
  problem: string
  approach: string
  result: string
}

export interface ProjectLink {
  label: string
  href: string
  /** 프로젝트 카드 하단에 바로 노출할 짧은 이름 (예: 'GitHub'). 없으면 카드에는 표시하지 않는다. */
  cardLabel?: string
}

export interface Project {
  /** URL 경로에 쓰이는 식별자. 예: /projects/shatterline */
  slug: string
  title: string
  /** 한 줄 소개. 카드와 목록에 노출된다. */
  tagline: string
  /** 2~3문장 요약. 상세 페이지 상단에 노출된다. */
  summary: string
  /** 내 담당 항목. 홈 대표 카드에서 tagline 아래 ' · '로 이어 한 줄로 노출된다. */
  highlight?: string[]
  period: string
  role: string
  team: string
  platform: string
  engine: string
  /** 필터와 카드 뱃지에 쓰이는 키워드. */
  tags: string[]
  /** Home에 노출할 대표 프로젝트 여부. */
  featured: boolean
  /** 대표 플레이 영상. 없으면 영상 영역 자체를 표시하지 않는다. */
  video?: MediaSource
  /** 추가 영상/이미지 (선택). */
  extraMedia?: MediaSource[]
  /** 담당 범위. */
  responsibilities: string[]
  /** 핵심 구현. */
  features: Feature[]
  /** 기술적 문제 해결 사례. */
  caseStudies: CaseStudy[]
  /** 한계 (선택). */
  limitations?: string[]
  /** 회고 (선택). */
  takeaways?: string[]
  links: ProjectLink[]
}

/** 상세 페이지 없이 저장소로 바로 연결하는 소규모 프로젝트. */
export interface RepoProject {
  title: string
  tagline: string
  period: string
  engine: string
  tags: string[]
  href: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface TimelineItem {
  period: string
  title: string
  org: string
  details: string[]
}
