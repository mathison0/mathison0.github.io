import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

export default function HomePage() {
  const featured = projects.filter((project) => project.featured)

  return (
    <>
      <Seo
        title={`${profile.name}`}
        description={profile.intro}
      />

      {/* 커버 레터형 히어로: 이름·요약·연락 수단이 첫 화면에 다 보이도록 */}
      <section className="hero" aria-label="프로필 요약">
        <div className="container">
          <h1 className="hero__name">
            {profile.nameKo} <span className="hero__name-en">{profile.name}</span>
          </h1>
          <p className="hero__headline">{profile.headline}</p>

          <ul className="highlights">
            {profile.highlights.map((item) => (
              <li key={item.lead} className="highlights__item">
                <strong className="highlights__lead">{item.lead}</strong>
                {'text' in item ? `: ${item.text}` : null}
                {'links' in item
                  ? item.links.map((link) =>
                      link.href.startsWith('/') ? (
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
          <Link className="hero__more" to="/about">
            이력 전체 보기 →
          </Link>

          <div className="btn-row hero__actions">
            <Link className="btn btn--primary" to="/projects">
              프로젝트 보기
            </Link>
            <a
              className="btn btn--ghost"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="featured-heading">대표 프로젝트</h2>
            <Link to="/projects">전체 보기 →</Link>
          </div>
          <div className="featured-list">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} layout="wide" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
