import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'
import TagList from '../components/TagList'
import { profile, skillGroups, timeline } from '../data/profile'
import { projects, repoProjects } from '../data/projects'

/**
 * 한 페이지 포트폴리오: 요약 → 프로젝트 → 소개·기술 → 이력 → 연락처.
 * 상단 메뉴는 각 섹션 id로 이동한다 (Layout의 NAV_ITEMS).
 */
export default function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)
  const { hash } = useLocation()

  // /#about 같은 주소로 바로 들어오거나 /about에서 리다이렉트된 경우에도 해당 섹션으로 이동
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <>
      <Seo title={`${profile.name}`} description={profile.intro} />

      {/* 커버 레터형 히어로: 이름·핵심 성과·연락 수단이 첫 화면에 다 보이도록 */}
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
          <Link className="hero__more" to={{ hash: 'experience' }}>
            이력 전체 보기 ↓
          </Link>

          <div className="btn-row hero__actions">
            <Link className="btn btn--primary" to={{ hash: 'projects' }}>
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

      <section id="projects" className="section" aria-labelledby="featured-heading">
        <div className="container">
          <h2 id="featured-heading" className="section-title">
            대표 프로젝트
          </h2>
          <div className="featured-list">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} layout="wide" />
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
                          GitHub 저장소 ↗
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

      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading" className="section-title">
            소개
          </h2>
          <div className="prose about-intro">
            <p>{profile.intro}</p>
            <p>
              만든 것을 측정으로 검증하는 일을 좋아합니다. 피카츄 배구 AI 대회에 팀으로 참가해
              3위를 했고, 저는 엔진 물리를 복제한 룰 기반 봇과 실제 엔진으로 수백 세트를 돌리는
              오프라인 평가 하네스를 만들었습니다. 대회 후에는 이 하네스를 강화학습 환경으로 감싸
              PPO 에이전트를 학습시키고, 룰 봇과 같은 조건에서 비교했습니다. AI 코딩 에이전트에게
              실험 실행을 맡기되, 무엇을 채택하고 기각할지는 측정 수치로 판단합니다.
            </p>
          </div>

          <h3 className="block__title about-skills-title">기술 스택</h3>
          <div className="about-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <h4 className="skill-group__title">{group.title}</h4>
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
