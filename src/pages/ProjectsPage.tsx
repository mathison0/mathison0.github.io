import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'
import { allTags, projects } from '../data/projects'

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const tags = useMemo(allTags, [])

  const visible = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects

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
            각 프로젝트는 플레이 영상과 함께, 담당한 구현과 문제 해결 과정을 정리했습니다.
          </p>

          <div className="filter-bar" style={{ marginTop: 'var(--sp-6)' }} role="group" aria-label="기술 필터">
            <button
              type="button"
              className="filter-chip"
              aria-pressed={activeTag === null}
              onClick={() => setActiveTag(null)}
            >
              전체 ({projects.length})
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
          ) : (
            <p className="empty">선택한 태그에 해당하는 프로젝트가 없습니다.</p>
          )}
        </div>
      </section>
    </>
  )
}
