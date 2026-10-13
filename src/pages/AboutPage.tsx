import Seo from '../components/Seo'
import { profile, skillGroups, timeline } from '../data/profile'

export default function AboutPage() {
  return (
    <>
      <Seo
        title={`About | ${profile.name}`}
        description={`${profile.name}의 소개, 기술 스택, 이력, 연락처.`}
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
              엔진을 블랙박스로 두지 않으려 합니다. 매주 팀을 바꿔가며 다른 사람의 엔진 코드를
              이어받아 확장했고, DynamicRope를 만들 때는 언리얼 엔진 소스를 따라 들어가 문제를
              풀었습니다. 덕분에 낯선 코드베이스에 빠르게 적응하는 것이 강점이 되었습니다.
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

      <section className="section" aria-labelledby="timeline-heading">
        <div className="container">
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
