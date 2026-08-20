import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="페이지를 찾을 수 없음 — Mathison" />
      <section className="container notfound">
        <p className="eyebrow">404</p>
        <h1 style={{ marginTop: 'var(--sp-3)' }}>페이지를 찾을 수 없습니다</h1>
        <p className="lead" style={{ marginTop: 'var(--sp-4)' }}>
          주소가 바뀌었거나 삭제된 페이지입니다.
        </p>
        <div className="btn-row notfound__actions">
          <Link className="btn btn--primary" to="/">
            홈으로
          </Link>
          <Link className="btn btn--ghost" to="/projects">
            프로젝트 보기
          </Link>
        </div>
      </section>
    </>
  )
}
