import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'
import TagList from '../components/TagList'
import { allTags, projects, repoProjects } from '../data/projects'

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const tags = useMemo(allTags, [])

  const visible = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects
  const visibleRepos = activeTag
    ? repoProjects.filter((project) => project.tags.includes(activeTag))
    : repoProjects

  return (
    <>
      <Seo
        title="Projects — Mathison"
        description="게임 클라이언트 프로젝트 목록. 전투 시스템, 렌더링, 네트워크 동기화, 에디터 툴."
      />

      <section className="section">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1 style={{ marginTop: 'var(--sp-3)' }}>프로젝트</h1>
          <p className="lead" style={{ marginTop: 'var(--sp-4)', maxWidth: '58ch' }}>
            각 프로젝트의 담당 범위와 핵심 구현, 문제 해결 과정을 정리했습니다.
          </p>

          <div className="filter-bar" style={{ marginTop: 'var(--sp-6)' }} role="group" aria-label="기술 필터">
            <button
              type="button"
              className="filter-chip"
              aria-pressed={activeTag === null}
              onClick={() => setActiveTag(null)}
            >
              전체 ({projects.length + repoProjects.length})
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="filter-chip"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
              >
                {tag}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <div className="project-grid">
              {visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : null}

          {visibleRepos.length > 0 ? (
            <section className="repo-projects" aria-labelledby="repo-projects-heading">
              <h2 id="repo-projects-heading" className="block__title">
                게임 외 프로젝트
              </h2>
              <div className="project-grid">
                {visibleRepos.map((project) => (
                  <article key={project.href} className="card">
                    <div className="card__body">
                      <div className="card__meta">
                        <span>{project.period}</span>
                        <span>{project.engine}</span>
                      </div>
                      <h3 className="card__title">
                        <a href={project.href} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                      </h3>
                      <p className="card__summary">{project.tagline}</p>
                      <TagList tags={project.tags} />
                      <div className="card__footer">
                        <a className="card__link" href={project.href} target="_blank" rel="noreferrer">
                          GitHub 저장소 ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {visible.length === 0 && visibleRepos.length === 0 ? (
            <p className="empty">선택한 태그에 해당하는 프로젝트가 없습니다.</p>
          ) : null}
        </div>
      </section>
    </>
  )
}
