import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { MediaSource, Project } from '../types'
import Media from './Media'
import TagList from './TagList'

function videoHref(source: MediaSource | undefined): string | null {
  switch (source?.kind) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${source.id}`
    case 'file':
      return source.src
    default:
      return null
  }
}

interface ProjectCardProps {
  project: Project
  /**
   * wide: 영상 왼쪽 + 요약까지 보여주는 가로형 (홈 대표 프로젝트).
   * compact: 영상 영역 없이 하단에 영상 링크만 두는 텍스트 카드 (전체 목록).
   */
  layout?: 'wide' | 'compact'
  /** 요약 줄에서 이 카드로 이동해 왔을 때 잠깐 강조한다. */
  flash?: boolean
}

export default function ProjectCard({
  project,
  layout = 'compact',
  flash = false,
}: ProjectCardProps) {
  const detailPath = `/projects/${project.slug}`
  const wide = layout === 'wide'
  const video = wide ? null : videoHref(project.video)
  const navigate = useNavigate()

  // 카드 빈 곳을 눌러도 '자세히 보기'처럼 상세 페이지로 간다.
  // 버튼·링크·영상 재생처럼 자체 동작이 있는 곳과, 글자를 드래그해 선택한 경우는 건드리지 않는다.
  // 키보드 사용자는 제목 링크와 '자세히 보기'로 같은 곳에 갈 수 있다.
  function handleCardClick(event: MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement
    if (target.closest('a, button, video, iframe')) return
    if (window.getSelection()?.toString()) return
    if (event.ctrlKey || event.metaKey) {
      window.open(detailPath, '_blank', 'noopener')
      return
    }
    navigate(detailPath)
  }

  return (
    <article
      id={`project-${project.slug}`}
      className={['card', 'card--clickable', wide && 'card--wide', flash && 'card--flash']
        .filter(Boolean)
        .join(' ')}
      onClick={handleCardClick}
    >
      {wide && project.video ? (
        <Media source={project.video} title={`${project.title} 영상`} variant="card" />
      ) : null}
      <div className="card__body">
        <div className="card__meta">
          <span>{project.period}</span>
          <span>{project.engine}</span>
        </div>
        <h3 className="card__title">
          <Link to={detailPath}>{project.title}</Link>
        </h3>
        <p className="card__summary">{project.tagline}</p>
        {wide && project.highlight ? (
          <p className="card__highlight">
            <span className="card__highlight-label">담당</span>
            {/* 항목 사이에서만 줄바꿈되도록 항목 단위로 감싸고, 구분점은 앞 항목 끝에 붙인다 */}
            {project.highlight.map((item, i, items) => (
              <span key={item}>
                <span className="card__highlight-item">
                  {item}
                  {i < items.length - 1 ? ' ·' : null}
                </span>{' '}
              </span>
            ))}
          </p>
        ) : null}
        <TagList tags={project.tags} />
        <div className="card__footer">
          <Link className="btn btn--primary btn--sm" to={detailPath}>
            자세히 보기 →
          </Link>
          {video ? (
            <a className="btn btn--ghost btn--sm" href={video} target="_blank" rel="noreferrer">
              영상 ↗
            </a>
          ) : null}
          {project.links
            .filter((link) => link.cardLabel)
            .map((link) => (
              <a
                key={link.href}
                className="btn btn--ghost btn--sm"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.cardLabel} ↗
              </a>
            ))}
        </div>
      </div>
    </article>
  )
}
