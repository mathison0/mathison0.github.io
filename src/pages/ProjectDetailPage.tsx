import { Link, useParams } from 'react-router-dom'
import Media from '../components/Media'
import Seo from '../components/Seo'
import TagList from '../components/TagList'
import { getProject } from '../data/projects'
import NotFoundPage from './NotFoundPage'

/** 본문 문자열을 빈 줄('\n\n') 기준으로 문단을 나눠 렌더링한다. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <>
      <Seo title={`${project.title} | Projects`} description={project.tagline} />

      <header className="detail-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="현재 위치">
            <Link to={{ pathname: '/', hash: 'projects' }}>Projects</Link>
            <span aria-hidden="true"> / </span>
            <span>{project.title}</span>
          </nav>

          <p className="eyebrow">{project.engine}</p>
          <h1 className="detail-header__title">{project.title}</h1>
          <p className="lead detail-header__summary">{project.summary}</p>

          <dl className="meta-grid" style={{ marginTop: 'var(--sp-6)' }}>
            <div>
              <dt>기간</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>역할</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>팀 구성</dt>
              <dd>{project.team}</dd>
            </div>
            <div>
              <dt>플랫폼</dt>
              <dd>{project.platform}</dd>
            </div>
          </dl>

          {/* 저장소·스토어 링크를 영상보다 먼저 보이게 한다 (하단에도 같은 링크가 있다) */}
          {project.links.length > 0 ? (
            <div className="btn-row detail-header__links">
              {project.links.map((link) => (
                <a
                  key={link.href + link.label}
                  className="btn btn--soft"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {project.video ? (
        <div className="container">
          <Media source={project.video} title={`${project.title} 플레이 영상`} />
        </div>
      ) : null}

      <div className="container section">
        <div className="detail-body">
          <section aria-labelledby="responsibilities-heading">
            <h2 id="responsibilities-heading" className="block__title">
              담당 범위
            </h2>
            <ul className="prose">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div style={{ marginTop: 'var(--sp-4)' }}>
              <TagList tags={project.tags} />
            </div>
          </section>

          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="block__title">
              핵심 구현
            </h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature.title}>
                  <div className="feature__head">
                    <h3>{feature.title}</h3>
                    {feature.tech ? (
                      <span className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                        {feature.tech.join(' · ')}
                      </span>
                    ) : null}
                  </div>
                  <div className="feature__body">
                    <Paragraphs text={feature.body} />
                  </div>
                  {feature.media ? (
                    <div className="feature__media">
                      <Media source={feature.media} title={feature.title} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          {project.caseStudies.length > 0 ? (
          <section aria-labelledby="case-heading">
            <h2 id="case-heading" className="block__title">
              문제 해결 사례
            </h2>
            <div style={{ display: 'grid', gap: 'var(--sp-5)' }}>
              {project.caseStudies.map((caseStudy) => (
                <dl key={caseStudy.problem} className="problem-solution">
                  <div className="problem-solution__row">
                    <dt>문제</dt>
                    <dd>
                      <Paragraphs text={caseStudy.problem} />
                    </dd>
                  </div>
                  <div className="problem-solution__row">
                    <dt>접근</dt>
                    <dd>
                      <Paragraphs text={caseStudy.approach} />
                    </dd>
                  </div>
                  <div className="problem-solution__row">
                    <dt>결과</dt>
                    <dd>
                      <Paragraphs text={caseStudy.result} />
                    </dd>
                  </div>
                </dl>
              ))}
            </div>
          </section>
          ) : null}

          {project.extraMedia && project.extraMedia.length > 0 ? (
            <section aria-labelledby="media-heading">
              <h2 id="media-heading" className="block__title">
                추가 자료
              </h2>
              <div style={{ display: 'grid', gap: 'var(--sp-5)' }}>
                {project.extraMedia.map((media, index) => (
                  <Media
                    key={index}
                    source={media}
                    title={`${project.title} 추가 자료 ${index + 1}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {project.takeaways && project.takeaways.length > 0 ? (
            <section aria-labelledby="takeaways-heading" className="callout">
              <p id="takeaways-heading" className="callout__label">
                배운 점
              </p>
              <ul className="prose" style={{ marginTop: 'var(--sp-3)' }}>
                {project.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.links.length > 0 ? (
            <section aria-label="관련 링크" className="btn-row">
              {project.links.map((link) => (
                <a
                  key={link.href + link.label}
                  className="btn btn--soft"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </>
  )
}
