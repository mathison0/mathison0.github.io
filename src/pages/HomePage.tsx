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
        title={`${profile.name} — ${profile.role}`}
        description={profile.intro}
      />

      <section className="hero">
        <div className="container">
          <p className="eyebrow">{profile.role}</p>
          <h1 className="hero__title">{profile.headline}</h1>
          <p className="lead hero__lead">{profile.intro}</p>
          <div className="btn-row hero__actions">
            <Link className="btn btn--primary" to="/projects">
              프로젝트 보기
            </Link>
            <Link className="btn btn--ghost" to="/about">
              소개 · 연락처
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-label="요약">
        <div className="container">
          <ul className="facts">
            {profile.facts.map((fact) => (
              <li key={fact.label} className="fact">
                <p className="fact__label">{fact.label}</p>
                <p className="fact__value">{fact.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="featured-heading">대표 프로젝트</h2>
            <Link to="/projects">전체 보기 →</Link>
          </div>
          <div className="project-grid">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
