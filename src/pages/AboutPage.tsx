import Seo from '../components/Seo'
import { profile, skillGroups, timeline, workingPrinciples } from '../data/profile'

export default function AboutPage() {
  return (
    <>
      <Seo
        title={`About — ${profile.name}`}
        description={`${profile.role} ${profile.name}의 소개, 기술 스택, 이력, 연락처.`}
      />

      <section className="section">
        <div className="container container--prose">
          <p className="eyebrow">About</p>
          <h1 style={{ marginTop: 'var(--sp-3)' }}>
            {profile.nameKo} <span className="muted">({profile.name})</span>
          </h1>
          <div className="prose" style={{ marginTop: 'var(--sp-5)' }}>
            <p>{profile.intro}</p>
            <p>
              게임을 하다가 “이건 어떻게 구현했지?”가 궁금해서 개발을 시작했고, 지금은 그 질문에
              직접 답을 만드는 일을 하고 있습니다. 잘 만든 조작감과 안정적인 프레임이 게임 경험의
              바탕이라고 믿고, 그 두 가지를 책임질 수 있는 클라이언트 개발자가 되는 것이 목표입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-heading">
        <div className="container">
          <h2 id="skills-heading" style={{ marginBottom: 'var(--sp-5)' }}>
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

      <section className="section" aria-labelledby="principles-heading">
        <div className="container container--prose">
          <h2 id="principles-heading" style={{ marginBottom: 'var(--sp-5)' }}>
            작업 방식
          </h2>
          <ul className="feature-list">
            {workingPrinciples.map((principle) => (
              <li key={principle.title}>
                <h3>{principle.title}</h3>
                <p className="feature__body">{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="timeline-heading">
        <div className="container container--prose">
          <h2 id="timeline-heading" style={{ marginBottom: 'var(--sp-5)' }}>
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
                      {item.details.map((detail) => (
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

      <section className="section" aria-labelledby="contact-heading">
        <div className="container container--prose">
          <h2 id="contact-heading" style={{ marginBottom: 'var(--sp-5)' }}>
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
