import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'
import TagList from '../components/TagList'
import { profile, skillGroups, timeline } from '../data/profile'
import { projects, repoProjects } from '../data/projects'

/**
 * 한 페이지 포트폴리오: 요약 → 프로젝트 → 이력 → 기술 스택 → 연락처.
 * 상단 메뉴는 각 섹션 id로 이동한다 (Layout의 NAV_ITEMS).
 */
export default function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)
  const { hash, key } = useLocation()
  const [flashSlug, setFlashSlug] = useState<string | null>(null)

  // /#skills 같은 주소로 바로 들어오거나 /about에서 리다이렉트된 경우에도 해당 섹션으로 이동.
  // 요약 줄의 '프로젝트 ↓'(#project-<slug>)로 온 경우에는 그 대표 카드를 잠깐 강조한다.
  // key를 의존성에 넣어 같은 링크를 다시 눌러도 다시 동작하게 한다.
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    if (!hash.startsWith('#project-')) {
      target?.scrollIntoView()
      return
    }
    // 카드는 메뉴 바로 아래에 붙이지 않고 화면 가운데에 둔다
    target?.scrollIntoView({ block: 'center' })
    setFlashSlug(hash.slice('#project-'.length))
    const timer = window.setTimeout(() => setFlashSlug(null), 2200)
    return () => window.clearTimeout(timer)
  }, [hash, key])

  return (
    <>
      <Seo title={`${profile.name}`} description={profile.intro} />

      {/* 커버 레터형 히어로: 이름·헤드라인·핵심 성과가 첫 화면에 다 보이도록 */}
      <section className="hero" aria-label="프로필 요약">
        <div className="container">
          <h1 className="hero__name">
            {profile.nameKo} <span className="hero__name-en">{profile.name}</span>
          </h1>
          <p className="hero__headline">
            {profile.headline.map((phrase, index) => (
              <span key={phrase} className="hero__phrase">
                {index > 0 ? ' ' : null}
                {phrase}
              </span>
            ))}
          </p>

          <ul className="highlights">
            {profile.highlights.map((item) => (
              <li key={item.lead} className="highlights__item">
                <strong className="highlights__lead">{item.lead}</strong>
                {'text' in item ? `: ${item.text}` : null}
                {'links' in item
                  ? item.links.map((link) =>
                      link.href.startsWith('#') ? (
                        <Link
                          key={link.href}
                          className="highlights__link"
                          to={{ hash: link.href.slice(1) }}
                        >
                          {link.label} ↓
                        </Link>
                      ) : link.href.startsWith('/') ? (
                        <Link
                          key={link.href}
                          className="highlights__link"
                          to={link.href}
                        >
                          {link.label} →
                        </Link>
                      ) : (
                        <a
                          key={link.href}
                          className="highlights__link"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ),
                    )
                  : null}
              </li>
            ))}
          </ul>
          <Link className="hero__more" to={{ hash: 'experience' }}>
            이력 전체 보기 ↓
          </Link>
        </div>
      </section>

      <section id="projects" className="section" aria-labelledby="featured-heading">
        <div className="container">
          <h2 id="featured-heading" className="section-title">
            대표 프로젝트
          </h2>
          <div className="featured-list">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                layout="wide"
                flash={flashSlug === project.slug}
              />
            ))}
          </div>
          {/* 보조 프로젝트는 기본으로 접어 둔다 */}
          <details className="more-projects">
            <summary className="more-projects__summary">
              그 외 프로젝트 {others.length + repoProjects.length}개
            </summary>
            <h3 className="block__title">그 외 게임 프로젝트</h3>
            <div className="project-grid">
              {others.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <div className="repo-projects">
              <h3 className="block__title">게임 외 프로젝트</h3>
              <div className="project-grid">
                {repoProjects.map((project) => (
                  <article key={project.href} className="card">
                    <div className="card__body">
                      <div className="card__meta">
                        <span>{project.period}</span>
                        <span>{project.engine}</span>
                      </div>
                      <h4 className="card__title">
                        <a href={project.href} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                      </h4>
                      <p className="card__summary">{project.tagline}</p>
                      <TagList tags={project.tags} />
                      <div className="card__footer">
                        <a
                          className="card__link"
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </details>
        </div>
      </section>

      <section id="experience" className="section" aria-labelledby="experience-heading">
        <div className="container">
          <h2 id="experience-heading" className="section-title">
            이력
          </h2>
          <ol className="timeline">
            {timeline.map((item) => (
              <li key={item.period + item.title}>
                <div className="timeline__row">
                  <p className="timeline__period">{item.period}</p>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__org">{item.org}</p>
                    <ul
                      className="prose"
                      style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-sm)' }}
                    >
                      {item.details.filter(Boolean).map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" className="section" aria-labelledby="skills-heading">
        <div className="container">
          <h2 id="skills-heading" className="section-title">
            기술 스택
          </h2>
          <div className="about-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <h3 className="skill-group__title">{group.title}</h3>
                <ul className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading" className="section-title">
            연락처
          </h2>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  {profile.githubUrl.replace('https://', '')}
                </a>
              </dd>
            </div>
            <div>
              <dt>solved.ac</dt>
              <dd>
                <a href={profile.bojUrl} target="_blank" rel="noreferrer">
                  {profile.bojUrl.replace('https://', '')}
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            {profile.resumeUrl ? (
              <div>
                <dt>Resume</dt>
                <dd>
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                    이력서 PDF ↗
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>
    </>
  )
}
