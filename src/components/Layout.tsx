import { useEffect, useState } from 'react'
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'

/** 한 페이지 안의 섹션 id. 상세 페이지에서 눌러도 홈의 해당 섹션으로 간다. */
const NAV_ITEMS = [
  { hash: 'projects', label: 'Projects' },
  { hash: 'skills', label: 'Skills' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'contact', label: 'Contact' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  const activeSection = useActiveSection(location.pathname)

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            {profile.name}
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '닫기' : '메뉴'}
          </button>

          <nav id="site-nav" className="nav" data-open={menuOpen} aria-label="주 메뉴">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.hash}
                to={{ pathname: '/', hash: item.hash }}
                className="nav__link"
                aria-current={activeSection === item.hash ? 'location' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
          </p>
          <div className="footer-links">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
      </footer>

      <ScrollRestoration />
    </div>
  )
}

/**
 * 지금 화면에서 읽고 있는 섹션의 id.
 * 홈에서는 화면 위쪽 35% 지점을 지난 마지막 섹션을, 맨 아래까지 내리면 마지막 섹션을 고른다.
 * 프로젝트 상세 페이지에서는 Projects로 본다.
 */
function useActiveSection(pathname: string): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname.startsWith('/projects/') ? 'projects' : null)
      return
    }

    const update = () => {
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.hash)
        if (section && section.getBoundingClientRect().top <= line) current = item.hash
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = NAV_ITEMS[NAV_ITEMS.length - 1].hash
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  return active
}
