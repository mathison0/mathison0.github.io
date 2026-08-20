/** 프로젝트 영상/이미지 소스. 영상이 아직 없으면 'placeholder'를 쓴다. */
export type MediaSource =
  | { kind: 'youtube'; id: string; start?: number; caption?: string }
  | { kind: 'file'; src: string; poster?: string; caption?: string }
  | { kind: 'placeholder'; caption?: string }

/** 구현 기능 한 항목: 무엇을 어떻게 만들었는지. */
export interface Feature {
  title: string
  tech?: string[]
  body: string
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
}

export interface Project {
  /** URL 경로에 쓰이는 식별자. 예: /projects/shatterline */
  slug: string
  title: string
  /** 한 줄 소개. 카드와 목록에 노출된다. */
  tagline: string
  /** 2~3문장 요약. 상세 페이지 상단에 노출된다. */
  summary: string
  period: string
  role: string
  team: string
  platform: string
  engine: string
  /** 필터와 카드 뱃지에 쓰이는 키워드. */
  tags: string[]
  /** Home에 노출할 대표 프로젝트 여부. */
  featured: boolean
  /** 대표 플레이 영상. */
  video: MediaSource
  /** 추가 영상/이미지 (선택). */
  extraMedia?: MediaSource[]
  /** 담당 범위. */
  responsibilities: string[]
  /** 핵심 구현. */
  features: Feature[]
  /** 기술적 문제 해결 사례. */
  caseStudies: CaseStudy[]
  /** 회고 (선택). */
  takeaways?: string[]
  links: ProjectLink[]
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
