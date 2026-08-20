import { Link } from 'react-router-dom'
import type { Project } from '../types'
import Media from './Media'
import TagList from './TagList'

export default function ProjectCard({ project }: { project: Project }) {
  const detailPath = `/projects/${project.slug}`

  return (
    <article className="card">
      <Media source={project.video} title={`${project.title} 영상`} variant="card" />
      <div className="card__body">
        <div className="card__meta">
          <span>{project.period}</span>
          <span>{project.engine}</span>
        </div>
        <h3 className="card__title">
          <Link to={detailPath}>{project.title}</Link>
        </h3>
        <p className="card__summary">{project.tagline}</p>
        <TagList tags={project.tags} />
        <div className="card__footer">
          <Link className="card__link" to={detailPath}>
            자세히 보기 →
          </Link>
        </div>
      </div>
    </article>
  )
}
