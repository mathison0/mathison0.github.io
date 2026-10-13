import { Link } from 'react-router-dom'
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
}

export default function ProjectCard({ project, layout = 'compact' }: ProjectCardProps) {
  const detailPath = `/projects/${project.slug}`
  const wide = layout === 'wide'
  const video = wide ? null : videoHref(project.video)

  return (
    <article className={wide ? 'card card--wide' : 'card'}>
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
          <Link className="card__link" to={detailPath}>
            자세히 보기 →
          </Link>
          {video ? (
            <a className="card__link" href={video} target="_blank" rel="noreferrer">
              영상 ↗
            </a>
          ) : null}
          {project.links
            .filter((link) => link.cardLabel)
            .map((link) => (
              <a
                key={link.href}
                className="card__link"
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
